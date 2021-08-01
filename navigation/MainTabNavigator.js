import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import Explore from '../containers/Explore';
import Orders from '../containers/Orders';
import Order from '../containers/Order';
import OrderItems from '../containers/OrderItems';
import OrderItem from '../containers/OrderItem';
import OrderDetails from '../containers/OrderDetails';
import OrderTrackingHistory from '../containers/OrderTrackingHistory';
import OrderItemReview from '../containers/OrderItemReview';
import OrderChat from '../containers/OrderChat';
import Product from '../containers/Product';
import ProductReviews from '../containers/ProductReviews';
import AddProudctQuestion from '../containers/AddProudctQuestion';
import Categories from '../containers/Categories';
import Category from '../containers/Category';
import Cart from '../containers/Cart';
import Search from '../containers/Search';
import SearchFilters from '../containers/SearchFilters';
import ProductQuestion from '../containers/ProudctQuestions/index';
import AddProudctQuestionAnswers from '../containers/AddProudctQuestionAnswers';
import Profile from '../containers/Profile/index';
import Redeem from '../containers/Redeem';
import Affiliate from '../containers/Affiliate';
import PersonalInfo from '../containers/PersonalInfo/index';
import EntitySelector from '../containers/EntitySelector';
import Address from '../containers/Address';
import Addres from '../containers/Addres';
import ChangePassword from "../containers/ChangePassword";
import Article from '../containers/Article';
import Articles from '../containers/Articles';
import Notifications from '../containers/Notifications';
import Checkout from '../containers/Checkout';
import MyProducts from '../containers/MyProducts';
import MyProduct from '../containers/MyProduct';
import NewProduct from '../presentational_components/Common/MyProduct/newProduct';
import ProductDescriptionRichText from '../presentational_components/Common/MyProduct/ProductDescriptionRichText';
import MonthlyOffers from '../containers/MonthlyOffers';
import FlashDeals from '../containers/FlashDeals';
import AfterOrder from '../containers/AfterOrder';
import SubStores from '../containers/SubStores';
import SubStore from '../containers/SubStore';
import MultiLevelSelector from '../containers/MultiLevelSelector';
import TextEditor from '../containers/TextEditor';
import Inbox from '../containers/Inbox';
import Support from '../containers/Support';
import ShippingCostEstimator from '../containers/ShippingCostEstimator';
import MySeles from '../containers/MySales';
import QRCodeReader from '../containers/QRCodeReader';
import ProductOptions from '../containers/ProductOptions';
import Discounts from '../containers/Discounts';
import Discount from '../containers/Discount';
import { connect } from 'react-redux';
import { withLocalize } from 'react-localize-redux';
import FontedText from '../partial_components/Common/FontedText';
import { View } from 'react-native';
import Courier from '../containers/Courier';
import AuthNavigator from './AuthNavigator';
import Wishlist from '../containers/Wishlist';
import MostLikes from '../containers/MostLikes';
import TermsOfService from '../containers/TermsOfService';
import AddSubStore from '../containers/AddSubStore';
import { shadowStyle1 } from '../constants/Style';
// import { store } from '../App';
import SubStoreProfile from '../containers/SubStoreProfile';
import SubStoreMap from '../presentational_components/Common/SubStoreProfile/SubStoreMap';
import MyCode from '../containers/MyCode';
import CommissionQRCode from '../containers/CommissionQRCode'
const Wishlist_Stack_Navigator = createStackNavigator()

const Wishlist_Stack = () => (
	<Wishlist_Stack_Navigator.Navigator headerMode='none' >
		<Wishlist_Stack_Navigator.Screen name="Wishlist" component={Wishlist} />
		<Wishlist_Stack_Navigator.Screen name="Product" component={Product} />
		<Wishlist_Stack_Navigator.Screen name="Category" component={Category} />
		<Wishlist_Stack_Navigator.Screen name="Categories_Alt" component={Categories_Alt_Stack} />
	</Wishlist_Stack_Navigator.Navigator>
)

const MostLikes_Stack_Navigator = createStackNavigator()

const MostLikes_Stack = () => (
	<MostLikes_Stack_Navigator.Navigator headerMode='none' >
		<MostLikes_Stack_Navigator.Screen name="MostLikes" component={MostLikes} />
		<MostLikes_Stack_Navigator.Screen name="Product" component={Product} />
		<MostLikes_Stack_Navigator.Screen name="Category" component={Category} />
		<MostLikes_Stack_Navigator.Screen name="Categories_Alt" component={Categories_Alt_Stack} />
	</MostLikes_Stack_Navigator.Navigator>
)

const Search_Stack_Navigator = createStackNavigator()

const Search_Stack = () => (
	<Search_Stack_Navigator.Navigator
		headerMode="none">
		<Search_Stack_Navigator.Screen name="Search" component={Search} />
		<Search_Stack_Navigator.Screen name="SearchFilters" component={SearchFilters} />
		<Search_Stack_Navigator.Screen name="EntitySelector" component={EntitySelector} />
	</Search_Stack_Navigator.Navigator>
)

const Product_Stack_Navigator = createStackNavigator()

const Product_Stack = () => (
	<Product_Stack_Navigator.Navigator
		headerMode="none">
		<Product_Stack_Navigator.Screen name="Product" component={Product} />
		<Product_Stack_Navigator.Screen name="ProductReviews" component={ProductReviews} />
		<Product_Stack_Navigator.Screen name="ProductQuestion" component={ProductQuestion} />
		<Product_Stack_Navigator.Screen name="AddProudctQuestion" component={AddProudctQuestion} />
		<Product_Stack_Navigator.Screen name="AddProudctQuestionAnswers" component={AddProudctQuestionAnswers} />
		<Product_Stack_Navigator.Screen name="SubStore" component={SubStore} />
		<Product_Stack_Navigator.Screen name="EntitySelector" component={EntitySelector} />
		<Product_Stack_Navigator.Screen name="Search" component={Search_Stack} />
		<Product_Stack_Navigator.Screen name="Category" component={Category} />
		<Product_Stack_Navigator.Screen name="Categories_Alt" component={Categories_Alt_Stack} />

	</Product_Stack_Navigator.Navigator>
)

const Orders_Stack_Navigator = createStackNavigator()

const Orders_Stack = () => (
	<Orders_Stack_Navigator.Navigator
		headerMode="none">
		<Orders_Stack_Navigator.Screen name="Orders" component={Orders} />
		<Orders_Stack_Navigator.Screen name="Order" component={Order} />
		<Orders_Stack_Navigator.Screen name="OrderItems" component={OrderItems} />
		<Orders_Stack_Navigator.Screen name="OrderItem" component={OrderItem} />
		<Orders_Stack_Navigator.Screen name="OrderDetails" component={OrderDetails} />
		<Orders_Stack_Navigator.Screen name="OrderTrackingHistory" component={OrderTrackingHistory} />
		<Orders_Stack_Navigator.Screen name="OrderItemReview" component={OrderItemReview} />
		<Orders_Stack_Navigator.Screen name="OrderChat" component={OrderChat} />
		<Orders_Stack_Navigator.Screen name="Support" component={Support} />
		<Orders_Stack_Navigator.Screen name="Product" component={Product_Stack} />
		<Orders_Stack_Navigator.Screen name="Search" component={Search_Stack} />
		<Orders_Stack_Navigator.Screen name="Category" component={Category} />
		<Orders_Stack_Navigator.Screen name="Categories_Alt" component={Categories_Alt_Stack} />
	</Orders_Stack_Navigator.Navigator>
)

const Orders_Alt_Stack_Navigator = createStackNavigator()

const Orders_Alt_Stack = () => (
	<Orders_Alt_Stack_Navigator.Navigator
		headerMode="none">
		<Orders_Alt_Stack_Navigator.Screen name="Orders_Alt" component={Orders} />
		<Orders_Alt_Stack_Navigator.Screen name="Order" component={Order} />
		<Orders_Alt_Stack_Navigator.Screen name="OrderItems" component={OrderItems} />
		<Orders_Alt_Stack_Navigator.Screen name="OrderItem" component={OrderItem} />
		<Orders_Alt_Stack_Navigator.Screen name="OrderDetails" component={OrderDetails} />
		<Orders_Alt_Stack_Navigator.Screen name="OrderTrackingHistory" component={OrderTrackingHistory} />
		<Orders_Alt_Stack_Navigator.Screen name="OrderItemReview" component={OrderItemReview} />
		<Orders_Alt_Stack_Navigator.Screen name="OrderChat" component={OrderChat} />
		<Orders_Alt_Stack_Navigator.Screen name="Search" component={Search_Stack} />
	</Orders_Alt_Stack_Navigator.Navigator>
)

const categoriesRouteProps = {
	view: "grid",
	top: false,
}

const Categories_Stack_Navigator = createStackNavigator()
const CategoriesScreen = (props) => (
	<Categories
		{...categoriesRouteProps}
		{...props} />
)

const Categories_Stack = () => (
	<Categories_Stack_Navigator.Navigator
		headerMode="none">
		<Categories_Stack_Navigator.Screen name="Categories" component={CategoriesScreen} />
		<Categories_Stack_Navigator.Screen name="Category" component={Category} />
		<Categories_Stack_Navigator.Screen name="ProductOptions" component={ProductOptions} />
		<Categories_Stack_Navigator.Screen name="Product" component={Product_Stack} />
		<Categories_Stack_Navigator.Screen name="Search" component={Search_Stack} />
		<Categories_Stack_Navigator.Screen name="Categories_Alt" component={Categories_Alt_Stack} />

	</Categories_Stack_Navigator.Navigator>
)

const Categories_Alt_Stack_Navigator = createStackNavigator()
const Categories_AltScreen = (props) => (
	<Categories
		{...categoriesRouteProps}
		alt={true}
		{...props} />
)

const Categories_Alt_Stack = () => (
	<Categories_Alt_Stack_Navigator.Navigator
		headerMode="none">
		<Categories_Alt_Stack_Navigator.Screen name="Categories_Alt" component={Categories_AltScreen} />
		<Categories_Alt_Stack_Navigator.Screen name="Category" component={Category} />
		<Categories_Alt_Stack_Navigator.Screen name="ProductOptions" component={ProductOptions} />
		<Categories_Alt_Stack_Navigator.Screen name="Product" component={Product_Stack} />
		<Categories_Alt_Stack_Navigator.Screen name="Search" component={Search_Stack} />
	</Categories_Alt_Stack_Navigator.Navigator>
)

const TopCategories_Stack_Navigator = createStackNavigator()
const TopCategoriesScreen = (props) => (
	<Categories
		view={"list"}
		top={true}
		{...props} />
)

const TopCategories_Stack = () => (
	<TopCategories_Stack_Navigator.Navigator
		headerMode="none">
		<TopCategories_Stack_Navigator.Screen name="TopCategories" component={TopCategoriesScreen} />
		<TopCategories_Stack_Navigator.Screen name="Category" component={Category} />
		<TopCategories_Stack_Navigator.Screen name="ProductOptions" component={ProductOptions} />
		<TopCategories_Stack_Navigator.Screen name="Product" component={Product_Stack} />
		<TopCategories_Stack_Navigator.Screen name="Search" component={Search_Stack} />
	</TopCategories_Stack_Navigator.Navigator>
)

const Notifications_Stack_Navigator = createStackNavigator()

const Notifications_Stack = () => (
	<Notifications_Stack_Navigator.Navigator
		headerMode="none">
		<Notifications_Stack_Navigator.Screen name="Notifications" component={Notifications} />
		<Notifications_Stack_Navigator.Screen name="Search" component={Search_Stack} />
	</Notifications_Stack_Navigator.Navigator>
)

const Articles_Stack_Navigator = createStackNavigator()

const Articles_Stack = () => (
	<Articles_Stack_Navigator.Navigator
		headerMode="none">
		<Articles_Stack_Navigator.Screen name="Articles" component={Articles} />
		<Articles_Stack_Navigator.Screen name="Article" component={Article} />
		<Articles_Stack_Navigator.Screen name="Search" component={Search_Stack} />
	</Articles_Stack_Navigator.Navigator>
)


const Article_Stack_Navigator = createStackNavigator()

const Article_Stack = () => (
	<Article_Stack_Navigator.Navigator
		headerMode="none">
		<Article_Stack_Navigator.Screen name="Article" component={Article} />
	</Article_Stack_Navigator.Navigator>
)

const Cart_Stack_Navigator = createStackNavigator()

const Cart_Stack = () => (
	<Cart_Stack_Navigator.Navigator
		headerMode="none">
		<Cart_Stack_Navigator.Screen name="Cart" component={Cart} />
		<Cart_Stack_Navigator.Screen name="AuthNavigator" component={AuthNavigator} />
		<Cart_Stack_Navigator.Screen name="Checkout" component={Checkout} />
		<Cart_Stack_Navigator.Screen name="Courier" component={Courier} />
		<Cart_Stack_Navigator.Screen name="QRCodeReader" component={QRCodeReader} />
		<Cart_Stack_Navigator.Screen name="Addresses" component={Address} />
		<Cart_Stack_Navigator.Screen name="Addres" component={Addres} />
		<Cart_Stack_Navigator.Screen name="EntitySelector" component={EntitySelector} />
		<Cart_Stack_Navigator.Screen name="Product" component={Product_Stack} />
		<Cart_Stack_Navigator.Screen name="AfterOrder" component={AfterOrder} />
		<Cart_Stack_Navigator.Screen name="Search" component={Search_Stack} />
		<Cart_Stack_Navigator.Screen name="TermsOfService" component={TermsOfService} />
		<Cart_Stack_Navigator.Screen name="Category" component={Category} />
		<Cart_Stack_Navigator.Screen name="Categories_Alt" component={Categories_Alt_Stack} />

	</Cart_Stack_Navigator.Navigator>
)

const MonthlyOffers_Stack_Navigator = createStackNavigator()

const MonthlyOffers_Stack = () => (
	<MonthlyOffers_Stack_Navigator.Navigator
		headerMode="none">
		<MonthlyOffers_Stack_Navigator.Screen name="MonthlyOffers" component={MonthlyOffers} />
		<MonthlyOffers_Stack_Navigator.Screen name="Product" component={Product_Stack} />
		<MonthlyOffers_Stack_Navigator.Screen name="Search" component={Search_Stack} />
		<MonthlyOffers_Stack_Navigator.Screen name="Category" component={Category} />
		<MonthlyOffers_Stack_Navigator.Screen name="Categories_Alt" component={Categories_Alt_Stack} />
	</MonthlyOffers_Stack_Navigator.Navigator>
)

const FlashDeals_Stack_Navigator = createStackNavigator()

const FlashDeals_Stack = () => (
	<FlashDeals_Stack_Navigator.Navigator
		headerMode="none">
		<FlashDeals_Stack_Navigator.Screen name="FlashDeals" component={FlashDeals} />
		<FlashDeals_Stack_Navigator.Screen name="Product" component={Product_Stack} />
		<FlashDeals_Stack_Navigator.Screen name="Search" component={Search_Stack} />
		<FlashDeals_Stack_Navigator.Screen name="Category" component={Category} />
		<FlashDeals_Stack_Navigator.Screen name="Categories_Alt" component={Categories_Alt_Stack} />

	</FlashDeals_Stack_Navigator.Navigator>
)

const MyProducts_Stack_Navigator = createStackNavigator()
const MyProductsScreen = (props) => (
	<MyProducts
		main={true}
		{...props} />
)

const MyProducts_Stack = () => (
	<MyProducts_Stack_Navigator.Navigator
		headerMode="none">
		<MyProducts_Stack_Navigator.Screen name="MyProducts" component={MyProductsScreen} />
		<MyProducts_Stack_Navigator.Screen name="MyProduct" component={MyProduct} />
		<MyProducts_Stack_Navigator.Screen name="NewProduct" component={NewProduct} />
		<MyProducts_Stack_Navigator.Screen name="EntitySelector" component={EntitySelector} />
		<MyProducts_Stack_Navigator.Screen name="MultiLevelSelector" component={MultiLevelSelector} />
		<MyProducts_Stack_Navigator.Screen name="TextEditor" component={TextEditor} />
		<MyProducts_Stack_Navigator.Screen name="ProductDescriptionRichText" component={ProductDescriptionRichText} />
		<MyProducts_Stack_Navigator.Screen name="Search" component={Search_Stack} />
	</MyProducts_Stack_Navigator.Navigator>
)

const MyProducts_Alt_Stack_Navigator = createStackNavigator()
const MyProducts_AltScreen = (props) => (
	<MyProducts
		main={false}
		{...props} />
)

const MyProducts_Alt_Stack = () => (
	<MyProducts_Alt_Stack_Navigator.Navigator
		headerMode="none">
		<MyProducts_Alt_Stack_Navigator.Screen name="MyProducts" component={MyProducts_AltScreen} />
		<MyProducts_Alt_Stack_Navigator.Screen name="MyProduct" component={MyProduct} />
		<MyProducts_Alt_Stack_Navigator.Screen name="NewProduct" component={NewProduct} />
		<MyProducts_Alt_Stack_Navigator.Screen name="EntitySelector" component={EntitySelector} />
		<MyProducts_Alt_Stack_Navigator.Screen name="MultiLevelSelector" component={MultiLevelSelector} />
		<MyProducts_Alt_Stack_Navigator.Screen name="TextEditor" component={TextEditor} />
		<MyProducts_Alt_Stack_Navigator.Screen name="Search" component={Search_Stack} />
	</MyProducts_Alt_Stack_Navigator.Navigator>
)

const CustomerHome_Stack_Navigator = createStackNavigator()
const MySalesAltScreen = (props) => (
	<MySeles
		main={false}
		{...props} />
)

const CustomerHome_Stack = () => (
	<CustomerHome_Stack_Navigator.Navigator
		headerMode="none">

		<CustomerHome_Stack_Navigator.Screen name="Profile" component={Profile} />
		<CustomerHome_Stack_Navigator.Screen name="TermsOfService" component={TermsOfService} />
		<CustomerHome_Stack_Navigator.Screen name="Redeem" component={Redeem} />
		<CustomerHome_Stack_Navigator.Screen name="Affiliate" component={Affiliate} />
		<CustomerHome_Stack_Navigator.Screen name="PersonalInfo" component={PersonalInfo} />
		<CustomerHome_Stack_Navigator.Screen name="Address" component={Address} />
		<CustomerHome_Stack_Navigator.Screen name="Addres" component={Addres} />
		<CustomerHome_Stack_Navigator.Screen name="EntitySelector" component={EntitySelector} />
		<CustomerHome_Stack_Navigator.Screen name="ChangePassword" component={ChangePassword} />
		<CustomerHome_Stack_Navigator.Screen name="TextEditor" component={TextEditor} />
		<CustomerHome_Stack_Navigator.Screen name="MyStore" component={SubStoreProfile} />
		<CustomerHome_Stack_Navigator.Screen name="MyProducts_Alt" component={MyProducts_Alt_Stack} />
		<CustomerHome_Stack_Navigator.Screen name="MySales" component={MySalesAltScreen} />
		<CustomerHome_Stack_Navigator.Screen name="Search" component={Search_Stack} />
		<CustomerHome_Stack_Navigator.Screen name="Category" component={Category} />
		<CustomerHome_Stack_Navigator.Screen name="Categories_Alt" component={Categories_Alt_Stack} />
		<CustomerHome_Stack_Navigator.Screen name="Product" component={Product_Stack} />
		<AddNewSubStore_Stack_Navigator.Screen name="AddSubStore" component={AddSubStore} />
		<AddNewSubStore_Stack_Navigator.Screen name="SubStoreMap" component={SubStoreMap} />

	</CustomerHome_Stack_Navigator.Navigator>
)

const Explore_Stack_Navigator = createStackNavigator()

const Explore_Stack = () => (
	<Explore_Stack_Navigator.Navigator
		headerMode="none">
		<Explore_Stack_Navigator.Screen name="Explore" component={Explore} />
		<Explore_Stack_Navigator.Screen name="ProductOptions" component={ProductOptions} />
		<Explore_Stack_Navigator.Screen name="Product" component={Product_Stack} />
		<Explore_Stack_Navigator.Screen name="Category" component={Category} />
		<Explore_Stack_Navigator.Screen name="Categories_Alt" component={Categories_Alt_Stack} />
		<Explore_Stack_Navigator.Screen name="MonthlyOffers" component={MonthlyOffers_Stack} />
		<Explore_Stack_Navigator.Screen name="FlashDeals" component={FlashDeals_Stack} />
		<Explore_Stack_Navigator.Screen name="Search" component={Search_Stack} />
	</Explore_Stack_Navigator.Navigator>
)

const SubStores_Stack_Navigator = createStackNavigator()

const SubStores_Stack = () => (
	<SubStores_Stack_Navigator.Navigator
		headerMode="none">
		<SubStores_Stack_Navigator.Screen name="SubStores" component={SubStores} initialParams={{
			Favourite: false
		}} />
		<SubStores_Stack_Navigator.Screen name="SubStore" component={SubStore} />
		<SubStores_Stack_Navigator.Screen name="Product" component={Product_Stack} />
		<SubStores_Stack_Navigator.Screen name="Search" component={Search_Stack} />
	</SubStores_Stack_Navigator.Navigator>
)

const Favourite_SubStores_Stack_Navigator = createStackNavigator()

const Favourite_SubStores_Stack = () => (
	<Favourite_SubStores_Stack_Navigator.Navigator
		headerMode="none">
		<Favourite_SubStores_Stack_Navigator.Screen name="SubStores" component={SubStores} initialParams={{
			Favourite: true
		}} />
		<Favourite_SubStores_Stack_Navigator.Screen name="SubStore" component={SubStore} />
		<Favourite_SubStores_Stack_Navigator.Screen name="Product" component={Product_Stack} />
		<Favourite_SubStores_Stack_Navigator.Screen name="Search" component={Search_Stack} />
	</Favourite_SubStores_Stack_Navigator.Navigator>
)

const Inbox_Stack_Navigator = createStackNavigator()

const Inbox_Stack = () => (
	<Inbox_Stack_Navigator.Navigator
		headerMode="none">
		<Inbox_Stack_Navigator.Screen name="Inbox" component={Inbox} />
		<Inbox_Stack_Navigator.Screen name="OrderChat" component={OrderChat} />
		<Inbox_Stack_Navigator.Screen name="Orders_Alt" component={Orders_Alt_Stack} />
		<Inbox_Stack_Navigator.Screen name="Support" component={Support} />
		<Inbox_Stack_Navigator.Screen name="Search" component={Search_Stack} />
	</Inbox_Stack_Navigator.Navigator>
)

const Support_Stack_Navigator = createStackNavigator()

const Support_Stack = () => (
	<Support_Stack_Navigator.Navigator
		headerMode="none">
		<Support_Stack_Navigator.Screen name="Support" component={Support} />
		<Support_Stack_Navigator.Screen name="Search" component={Search_Stack} />
	</Support_Stack_Navigator.Navigator>
)

const ShippingCostEstimator_Stack_Navigator = createStackNavigator()

const ShippingCostEstimator_Stack = () => (
	<ShippingCostEstimator_Stack_Navigator.Navigator
		headerMode="none">
		<ShippingCostEstimator_Stack_Navigator.Screen name="ShippingCostEstimator" component={ShippingCostEstimator} />
		<ShippingCostEstimator_Stack_Navigator.Screen name="Search" component={Search_Stack} />
	</ShippingCostEstimator_Stack_Navigator.Navigator>
)

const MySales_Stack_Navigator = createStackNavigator()
const MySalesScreen = (props) => <MySeles {...props} main={true} />

const MySales_Stack = () => (
	<MySales_Stack_Navigator.Navigator
		headerMode="none">
		<MySales_Stack_Navigator.Screen name="MySales" component={MySalesScreen} />
		<MySales_Stack_Navigator.Screen name="Search" component={Search_Stack} />
	</MySales_Stack_Navigator.Navigator>
)

const QRCodeReader_Stack_Navigator = createStackNavigator()

const QRCodeReader_Stack = () => (
	<QRCodeReader_Stack_Navigator.Navigator
		headerMode="none">
		<QRCodeReader_Stack_Navigator.Screen name="QRCodeReader" component={QRCodeReader} />
		<QRCodeReader_Stack_Navigator.Screen name="Search" component={Search_Stack} />
	</QRCodeReader_Stack_Navigator.Navigator>
)


const CommissionQRCode_Stack_Navigator = createStackNavigator()

const CommissionQRCode_Stack = () => (
	<CommissionQRCode_Stack_Navigator.Navigator
		headerMode="none">
		<CommissionQRCode_Stack_Navigator.Screen name="CommissionQRCode" component={CommissionQRCode} />
		<CommissionQRCode_Stack_Navigator.Screen name="Search" component={Search_Stack} />
	</CommissionQRCode_Stack_Navigator.Navigator>
)

const MyCode_Stack_Navigator = createStackNavigator()

const MyCode_Stack = () => (
	<MyCode_Stack_Navigator.Navigator
		headerMode="none">
		<MyCode_Stack_Navigator.Screen name="MyCode" component={MyCode} />
	</MyCode_Stack_Navigator.Navigator>
)

const Discounts_Stack_Navigator = createStackNavigator()

const Discounts_Stack = () => (
	<Discounts_Stack_Navigator.Navigator
		headerMode="none">
		<Discounts_Stack_Navigator.Screen name="Discounts" component={Discounts} />
		<Discounts_Stack_Navigator.Screen name="Discount" component={Discount} />
		<Discounts_Stack_Navigator.Screen name="Product" component={Product_Stack} />
		<Discounts_Stack_Navigator.Screen name="Search" component={Search_Stack} />
	</Discounts_Stack_Navigator.Navigator>
)

const AddNewSubStore_Stack_Navigator = createStackNavigator()

const AddNewSubStore_Stack = () => (
	<AddNewSubStore_Stack_Navigator.Navigator
		headerMode="none">
		<AddNewSubStore_Stack_Navigator.Screen name="AddSubStore" component={AddSubStore} />
		<AddNewSubStore_Stack_Navigator.Screen name="NewProduct" component={NewProduct} />
		<AddNewSubStore_Stack_Navigator.Screen name="MultiLevelSelector" component={MultiLevelSelector} />
		<AddNewSubStore_Stack_Navigator.Screen name="MyStore" component={SubStoreProfile} />
		<AddNewSubStore_Stack_Navigator.Screen name="TextEditor" component={TextEditor} />
		<AddNewSubStore_Stack_Navigator.Screen name="SubStoreMap" component={SubStoreMap} />
		<AddNewSubStore_Stack_Navigator.Screen name="MyProducts_Alt" component={MyProducts_Alt_Stack} />
		<AddNewSubStore_Stack_Navigator.Screen name="MySales" component={MySalesAltScreen} />
	</AddNewSubStore_Stack_Navigator.Navigator>
)

const Tab = createBottomTabNavigator();

export const tabBarIconSize = 18

const tabs = {
	"Explore": {
		name: "Explore",
		component: Explore_Stack,
		icon: ({ color }) => <SimpleLineIcons color={color} name='magnifier' size={tabBarIconSize} />
	},
	"Cart": {
		name: "Cart",
		component: Cart_Stack,
		icon: ({ color, badge }) => (
			<View>
				<SimpleLineIcons color={color} name='basket-loaded' size={tabBarIconSize} />

				{badge > 0 && (
					<View
						style={{
							position: 'absolute',
							right: -9,
							top: -6,
							backgroundColor: 'red',
							borderRadius: 8,
							width: 16,
							height: 16,
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<FontedText style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>{badge}</FontedText>
					</View>
				)}
			</View>
		)
	},
	"Categories": {
		name: "Categories",
		component: Categories_Stack,
		icon: ({ color }) => <SimpleLineIcons color={color} name='layers' size={tabBarIconSize} />
	},
	"TopCategories": {
		name: "TopCategories",
		component: TopCategories_Stack,
		icon: ({ color }) => <SimpleLineIcons color={color} name='layers' size={tabBarIconSize} />
	},
	"Profile": {
		name: "Profile",
		component: CustomerHome_Stack,
		icon: ({ color }) => <SimpleLineIcons color={color} name='user' size={tabBarIconSize} />
	},
	"Notifications": {
		name: "Notifications",
		component: Notifications_Stack,
		icon: ({ color, badge }) => (
			<View>
				<SimpleLineIcons color={color} name='bell' size={tabBarIconSize} />
				{badge > 0 && (
					<View
						style={{
							position: 'absolute',
							right: -9,
							top: -6,
							backgroundColor: 'red',
							borderRadius: 8,
							width: 16,
							height: 16,
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<FontedText style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>{badge}</FontedText>
					</View>)}
			</View>
		)
	},
	"Orders": {
		name: "Orders",
		component: Orders_Stack,
		icon: ({ color }) => <SimpleLineIcons color={color} name='bag' size={tabBarIconSize} />
	},
	"Articles": {
		name: "Articles",
		component: Articles_Stack,
		icon: ({ color }) => <SimpleLineIcons color={color} name='doc' size={tabBarIconSize} />
	},
	"Article": {
		name: "Article",
		component: Article_Stack,
		icon: ({ color }) => <SimpleLineIcons color={color} name='doc' size={tabBarIconSize} />
	},
	"MyProducts": {
		name: "MyProducts",
		component: MyProducts_Stack,
		icon: ({ color }) => <SimpleLineIcons color={color} name='handbag' size={tabBarIconSize} />
	},
	"SubStores": {
		name: "SubStores",
		component: SubStores_Stack,
		icon: ({ color }) => <SimpleLineIcons color={color} name='organization' size={tabBarIconSize} />
	},
	"MonthlyOffers": {
		name: "MonthlyOffers",
		component: MonthlyOffers_Stack,
		icon: ({ color }) => <SimpleLineIcons color={color} name='wallet' size={tabBarIconSize} />
	},
	"FlashDeals": {
		name: "FlashDeals",
		component: FlashDeals_Stack,
		icon: ({ color }) => <SimpleLineIcons color={color} name='fire' size={tabBarIconSize} />
	},
	"Inbox": {
		name: "Inbox",
		component: Inbox_Stack,
		icon: ({ color, badge }) => (
			<View>
				<SimpleLineIcons color={color} name='drawer' size={tabBarIconSize} />
				{badge > 0 && (
					<View
						style={{
							position: 'absolute',
							right: -9,
							top: -6,
							backgroundColor: 'red',
							borderRadius: 8,
							width: 16,
							height: 16,
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<FontedText style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>{badge}</FontedText>
					</View>)}
			</View>
		)
	},
	"Support": {
		name: "Support",
		component: Support_Stack,
		icon: ({ color, badge }) => (
			<View>
				<SimpleLineIcons color={color} name='bubbles' size={tabBarIconSize} />
				{badge > 0 && (
					<View
						style={{
							position: 'absolute',
							right: -9,
							top: -6,
							backgroundColor: 'red',
							borderRadius: 8,
							width: 16,
							height: 16,
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<FontedText style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>{badge}</FontedText>
					</View>)}
			</View>
		)
	},
	"ShippingCostEstimator": {
		name: "ShippingCostEstimator",
		component: ShippingCostEstimator_Stack,
		icon: ({ color }) => <MaterialCommunityIcons color={color} name='map-marker-path' size={tabBarIconSize} />
	},
	"MySales": {
		name: "MySales",
		component: MySales_Stack,
		icon: ({ color }) => <SimpleLineIcons color={color} name='briefcase' size={tabBarIconSize} />
	},
	"QRCodeReader": {
		name: "QRCodeReader",
		component: QRCodeReader_Stack,
		icon: ({ color }) => <MaterialCommunityIcons color={color} name='qrcode-scan' size={tabBarIconSize} />
	},
	"Discounts": {
		name: "Discounts",
		component: Discounts_Stack,
		icon: ({ color }) => <Feather color={color} name='percent' size={tabBarIconSize} />
	},
	"Product": {
		name: "Product",
		component: Product_Stack,
		icon: ({ color }) => <SimpleLineIcons color={color} name='bag' size={tabBarIconSize} />
	},
	"WishList": {
		name: "WishList",
		component: Wishlist_Stack,
		icon: ({ color }) => <AntDesign color={color} name='staro' size={tabBarIconSize} />
	},
	"MostLikes": {
		name: "MostLikes",
		component: MostLikes_Stack,
		icon: ({ color }) => <SimpleLineIcons color={color} name='heart' size={tabBarIconSize} />
	},
	"FavouriteSubStores": {
		name: "FavouriteSubStores",
		component: Favourite_SubStores_Stack,
		icon: ({ color }) => <SimpleLineIcons color={color} name='organization' size={tabBarIconSize} />
	},
	"AddSubstore": {
		name: ' ',
		component: AddNewSubStore_Stack,
		icon: ({ bgColor1, mainColor }) => (
			<View style={{ position: 'absolute', bottom: 9.5, width: 45, height: 45, borderRadius: (45) / 2, backgroundColor: mainColor, alignItems: 'center', ...shadowStyle1 }} >
				<AntDesign color={bgColor1} name='plus' size={45} />
			</View>
		)
	},
	"MyCode": {
		name: "MyCode",
		component: MyCode_Stack,
		icon: ({ color }) => <MaterialCommunityIcons color={color} name='qrcode-scan' size={tabBarIconSize} />
	},
	"CommissionQRCode": {
		name: "CommissionQRCode",
		component: CommissionQRCode_Stack,
		icon: ({ color }) => <MaterialCommunityIcons color={color} name='qrcode-scan' size={tabBarIconSize} />
	},
}

const HomeIcon = ({ color }) => <SimpleLineIcons color={color} name='home' size={tabBarIconSize} />

export const MainTabNavigator = ({
	textColor2,
	mainColor,
	bgColor1,
	translate,
	Navigation_Bar_10_2,
	Side_Menu_10_1,
	cart_count,
	badges_data,
	sidemenuarticle,
	subStoreId,
	overrideShowCommisionQrCode
}) => {
	const renderTab = (item, index) => {
		const tab = tabs[item]

		let tabBarLabel, tabBarIcon
		if (!tab) {
			return null
		}
		else if (index === 0) {
			tabBarLabel = translate("Home")
			tabBarIcon = HomeIcon
		}
		else if (tab.name == ' ') {
			tabBarLabel = subStoreId == null ? translate("AddStoreLaber") : translate("AddPoductsLabel")
			tabBarIcon = tab.icon
		}
		else if (item == "CommissionQRCode" && !overrideShowCommisionQrCode) {
			return null
		}
		// else if (!tab || !tab.name) {
		// 	return null
		// }
		else {
			tabBarLabel = translate(tab.name)
			tabBarIcon = tab.icon
		}

		return (
			<Tab.Screen
				key={index}
				name={tab.name}
				component={tab.component}
				options={{
					tabBarVisible: Navigation_Bar_10_2.Enable.Value,
					tabBarLabel: tabBarLabel,
					tabBarIcon: item === "Cart" ? ({ color }) => tab.icon({ color, badge: cart_count }) : ({ color }) => tabBarIcon({ color, badge: badges_data[tab.name], mainColor, bgColor1 }),
				}} />
		)
	}

	const renderHiddenTab = (item, index) => {
		const tab = tabs[item]
		if (!tab) {
			return (null)
		}
		return (
			<Tab.Screen
				key={index}
				name={tab.name}
				component={tab.component} />
		)
	}


	const HaveProductPage = Navigation_Bar_10_2.Items.Value.includes('Product')

	const hiddenTabs = Side_Menu_10_1.SideMenuItems.Value.filter(item => !Navigation_Bar_10_2.Items.Value.includes(item))

	if (HaveProductPage && Navigation_Bar_10_2.Items.Value[0] != 'Product') {
		const ProductIndex = Navigation_Bar_10_2.Items.Value.indexOf('Product')
		Navigation_Bar_10_2.Items.Value.splice(ProductIndex, 1)
	}

	if (sidemenuarticle.length > 0) {
		hiddenTabs.push('Article')
	}

	Navigation_Bar_10_2.SeconderyNavbar.Value.forEach((item) => {
		if (!Navigation_Bar_10_2.Items.Value.includes(item) && !Side_Menu_10_1.SideMenuItems.Value.includes(item)) {
			hiddenTabs.push(item)
		}
	})
	const renderTabBar = (props) => {
		const {
			state,
			...restProps
		} = props

		return (
			<BottomTabBar
				{...restProps}
				state={{
					...state,
					routes: state.routes.filter(item => !hiddenTabs.includes(item.name))
				}} />
		)
	}

	return (
		<Tab.Navigator
			backBehavior="history"
			tabBar={renderTabBar}
			tabBarOptions={{
				activeTintColor: mainColor,
				inactiveTintColor: textColor2,
				activeBackgroundColor: bgColor1,
				inactiveBackgroundColor: bgColor1,
				labelPosition: Navigation_Bar_10_2.LabelPosition.Value,
				showLabel: Navigation_Bar_10_2.IconStyle.Value === 1 || Navigation_Bar_10_2.IconStyle.Value === 3,
				showIcon: Navigation_Bar_10_2.IconStyle.Value === 1 || Navigation_Bar_10_2.IconStyle.Value === 2,
			}}>
			{Navigation_Bar_10_2.Items.Value.map(renderTab)}
			{hiddenTabs.map(renderHiddenTab)}
		</Tab.Navigator>
	)
}


const mapStateToProps = ({
	badges: {
		cart_count,
		badges_data
	},
	login: {
		subStoreId,
		user_data: {
			overrideShowCommisionQrCode
		}
	},
	runtime_config: {
		runtime_config: {
			screens: {
				Navigation_Bar_10_2,
				Side_Menu_10_1,
				sidemenuarticle,
			},
			colors: {
				textColor2,
				mainColor,
				bgColor1,
			},
		},
	},
}) => ({
	subStoreId,
	badges_data,
	cart_count,
	sidemenuarticle,
	Navigation_Bar_10_2,
	Side_Menu_10_1,
	textColor2,
	mainColor,
	bgColor1,
	overrideShowCommisionQrCode,
})

export default connect(mapStateToProps)(withLocalize(MainTabNavigator))