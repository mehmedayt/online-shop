import HeroComponent from "../Components/HeroComponent/HeroComponent";
import NewCollectionsComponent from "../Components/NewCollectionsComponent/NewCollectionsComponent";
import NewsLetterComponent from "../Components/NewsLetterComponent/NewsLetterComponent";
import OffersComponent from "../Components/OffersComponent/OffersComponent";
import PopularComponent from "../Components/PopularComponent/PopularComponent";

const ShopPage = () => {
    return (
        <div>
            <HeroComponent/>
            <PopularComponent/>
            <OffersComponent/>
            <NewCollectionsComponent/>
            <NewsLetterComponent/>
        </div>
    );
};

export default ShopPage;