import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from '../models/User'

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: process.env.GOOGLE_CALLBACK_URL!,
}, async (_accessToken, _refreshToken, profile, done) => {
  try {
    // Хэрэглэгч байгаа эсэх шалга
    let user = await User.findOne({ googleId: profile.id })
    
    if (!user) {
      // Email-ээр хайх (урьд нь email/password-аар бүртгүүлсэн бол)
      user = await User.findOne({ email: profile.emails?.[0].value })
      if (user) {
        // Байгаа хэрэглэгчид googleId холбох
        user.googleId = profile.id
        await user.save()
      } else {
        // Шинэ хэрэглэгч үүсгэх
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0].value,
          avatar: profile.photos?.[0].value,
          role: 'user',
        })
      }
    }
    return done(null, user)
  } catch (err) {
    return done(err)
  }
}))

passport.serializeUser((user: any, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})
