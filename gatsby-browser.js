/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react';
import Layout from './src/components/layout';
import { Provider } from "react-redux"
import stroe from './src/redux/configureStore';

export const wrapPageElement = ({ element, props }) => {
   return ( 
            <Provider store={stroe}>
                <Layout {...props}>
                    {element}
                </Layout>
            </Provider>
    )
}