import { screenWidth } from '../../../constants/Metrics';

export default PaddingCalculator = (numColumns) => {
    // const {
    //     largePagePadding,
    //     pagePadding,
    // } = this.props

    const pagePadding = 10;

    let AllPaddingWidth = (numColumns * pagePadding) + (pagePadding * 2/*container padding*/)

    // if (numColumns == 1)
    //     AllPaddingWidth = AllPaddingWidth * 2

    const result = {
        ScreenWidth: screenWidth,
        ItemWidth: (screenWidth - AllPaddingWidth) / numColumns,
        ContainerHorizontalPadding: pagePadding,
        ItemMarginHorizontal: pagePadding / 2,
        ImageDimension: numColumns == 1 ? 720 : numColumns == 2 ? 500 : 250,
    }
    return result;
}