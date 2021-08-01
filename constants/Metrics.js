import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get("window")

export const screenWidth = width;
export const screenHeight = height;

const Metrics = {
	screenWidth,
	screenHeight,
}

export default Metrics
