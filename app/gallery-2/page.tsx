import { GalleryTemplate } from "../components/GalleryTemplate";

export default function GalleryTwo() {
  return <GalleryTemplate
    title="Portraits"
    description="Editorial portraits with honest expression, subtle movement, and an atmosphere that feels unmistakably personal."
    hero="/portrait-4.jpg"
    images={["/portrait-4.jpg","/portrait-1.jpg","/portrait-2.jpg","/horizontal-1.jpg","/hero.jpg","/vertical-2.jpg","/hero-alt.jpg","/portrait-1.jpg","/horizontal-3.jpg","/portrait-4.jpg"]}
  />;
}
