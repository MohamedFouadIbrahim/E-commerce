import React, { Component } from 'react'
import { View } from 'react-native'
import LazyContainer from '../../../partial_components/Common/LazyContainer';
import RemoteDataContainer from '../../../partial_components/Common/RemoteDataContainer';
import ArticleItem from '../../../presentational_components/Theme7/Articles/ArticleItem';
import CustomHeader from '../../../partial_components/Common/CustomHeader';

export default class Articles extends Component {
   
    renderArticle = ({ item, index }) => {
        return (
            <ArticleItem
                navigation={this.props.navigation}
                pushNavigation={true}
                item={item}
                index={index} />
        )
    }

    render() {
        const {
            pagePadding,
			mainScreen,
		} = this.props

        return (
            <LazyContainer>
                <CustomHeader
                    navigation={this.props.navigation}
					mainScreen={mainScreen}
					title={"Articles"}
                    leftComponent="drawer" />

                {<RemoteDataContainer
                    url={"Article/Index"}
                    refresh={false}
                    keyExtractor={({ Id }) => `${Id}`}
                    numColumns={2}
                    contentContainerStyle={{
                        paddingVertical: pagePadding,
                    }}
                    ItemSeparatorComponent={
                        () => <View style={{ height: 10, backgroundColor: 'transparent' }} />
                    }
                    renderItem={this.renderArticle} />}

            </LazyContainer>
        )
    }
}