import { GalleryTemplate } from "../components/GalleryTemplate";

export default function GalleryFour() {
  return <GalleryTemplate
    title="Editorial"
    description="A study in light, texture, and quiet confidence—photographs made for artists, brands, and beautifully unconventional ideas."
    hero="/horizontal-1.jpg"
    images={["/horizontal-1.jpg","/portrait-2.jpg","/hero.jpg","/portrait-4.jpg","/vertical-2.jpg","/portrait-1.jpg","/hero-alt.jpg","/horizontal-3.jpg","/portrait-2.jpg","/horizontal-1.jpg","/portrait-4.jpg"]}
  />;
}
