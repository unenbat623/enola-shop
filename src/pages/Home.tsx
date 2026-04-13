import HeroSlider from '@/components/home/HeroSlider'
import CategoryGrid from '@/components/home/CategoryGrid'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import PromoBanners from '@/components/home/PromoBanners'
import NewArrivals from '@/components/home/NewArrivals'
import BrandCarousel from '@/components/home/BrandCarousel'
import Newsletter from '@/components/home/Newsletter'

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <CategoryGrid />
      <FeaturedProducts />
      <PromoBanners />
      <NewArrivals />
      <BrandCarousel />
      <Newsletter />
    </>
  )
}
