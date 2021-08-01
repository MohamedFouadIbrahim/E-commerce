import React from 'react'
//import { createAppContainer } from 'react-navigation'
//import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import ReviewsTab from './ReviewsTab';
import RelatedProductsTab from './RelatedProductsTab';
import QuestionsTab from './QuestionsTab';
import ProductTabBar from './ProductTabBar';

export default null

/*const ProductTabs = createAppContainer(createMaterialTopTabNavigator({
	Reviews: {
		screen: ({ screenProps, navigation }) => (
			<ReviewsTab
				tabNavigation={navigation}
				{...screenProps} />
		),
	},
	Questions: {
		screen: ({ screenProps, navigation }) => (
			<QuestionsTab
				tabNavigation={navigation}
				{...screenProps} />
		),
	},
	Related: {
		screen: ({ screenProps, navigation }) => (
			<RelatedProductsTab
				tabNavigation={navigation}
				{...screenProps} />
		),
	}

}, {
	lazy: true,
	animationEnabled: false,
	swipeEnabled: false,
	tabBarComponent: ProductTabBar,
}))

export default ProductTabs*/