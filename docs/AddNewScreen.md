// How to add new screen in Bottom Navigation Bar, SecondNavBar, Side Menu in Customer App ?
// 1-	Create a Folder with the Same Screen Name & index.js file in Containers 
// 2-	Create a Folder with the Same Screen Name & index.js file in Presentational Components 
// 3-	Go To MainTabNavigator 
// 4-	Create new Stack For the new Screen using createStackNavigator 
// 5-	Add the new created stack to tabs object => to Add the Screen to Bottom Navigation Bar
// 6-	Go To AppNavigator => to Add the Screen to Navigation Drawer
// 7-	Add the new Screen (Stack) to drawer_items object ( add “_Drawer” to the name)
// 8-	Go To SecondNavBar (in PartialComponents/theme26) => to Add the Screen to  SecondNavBar
// 9-	 Add the new Screen (Stack) to tabs object
