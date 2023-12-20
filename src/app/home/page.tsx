import AlbumReel from "@/components/AlbumReel";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const HomePage = () => {
  return (
    <MaxWidthWrapper>
      <div className="pt-20">
        <div>Uploads</div>
        <div className="grid grid-cols-4"></div>
        <AlbumReel query={{ sort: "desc", limit: 4 }} title="All Albums" />
      </div>
    </MaxWidthWrapper>
  );
};

export default HomePage;
