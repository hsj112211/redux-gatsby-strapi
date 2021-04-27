import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { setCheckedMenues,
         setCartList, 
         setOrderComplete, 
         setTotalPrice, 
         setSelectedCoupon,
         setInitializeState } from '../../redux/actions/menues';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'gatsby'

const SectionDiv = styled.div`
     margin: 0 0 10px 0;
`;

export const query = graphql`
    query {
        allStrapiMenus {
            edges {
                node {
                    id
                    menu_name
                    price
                    image_url {
                        publicURL
                    }
                }
            }
        }
    }
`;

const Menu = ({data: { allStrapiMenus }}) => {

    // redux action excute function
    const dispatch = useDispatch();

    // how to get redux state
    const checkedMenues = useSelector(state => state.menues.checkedMenues);
    const cartList = useSelector(state => state.menues.cartList);
    const totalPrice = useSelector(state => state.menues.totalPrice);
    const tempTotalPrice = useSelector(state => state.menues.tempTotalPrice);
    const selectedCoupon = useSelector(state => state.menues.selectedCoupon);

    // how to use this page state
    const [orderCountLength, setOrderCountLength] = useState(0);

    // state initialize
    const initializeState = () => {
        dispatch(setInitializeState());
    }

    // temp coupon
    const coupons = [ {name: "가입 기념 할인권", percentage: 10} , {name:"생일 축하 할인권", percentage:20} ];

    // add to cart / delete from cart btn ( checkbox / cancel btn )
    const addToCart = (e) => {
        dispatch(setCheckedMenues(e.target.value));
    }

    // if cancel btn click ? control check box value
    const isChecked = (state, id) => {
        return state.indexOf(id) !== -1
    }
    
    // set coupon
    const setCoupon = (e) => {
        dispatch(setSelectedCoupon(e.target.value));
    }

    // save cart list 
    useEffect(() => {
        // set cart list
        const cartList = allStrapiMenus.edges.filter(item => checkedMenues.includes(item.node.id));
        dispatch(setCartList(cartList));  
        
        // set total price
        let price = 0;
        cartList.forEach(item => price += item.node.price);
        dispatch(setTotalPrice(price,'totalPrice'));
        // if selected coupon && delete menu -> keep coupon price calculate
        if(selectedCoupon !== 0){
            price = price - ((price / 100) * selectedCoupon);
        }
        dispatch(setTotalPrice(price,'tempTotalPrice'));
        
    },[checkedMenues])

    // set coupon total price
    useEffect(() => {
            const discountPrice = (totalPrice / 100) * selectedCoupon;
            let setCouponePrice = totalPrice - discountPrice;
            dispatch(setTotalPrice(setCouponePrice,'tempTotalPrice'));
    }, [selectedCoupon])

    // set order detail 
    useEffect(() => {
        const orderItem = {
            totalPrice: tempTotalPrice,
            orderCount: checkedMenues.length,
            orderMenu: cartList,
            approvedCoupon: selectedCoupon
        }
        setOrderCountLength(checkedMenues.length);
        dispatch(setOrderComplete(orderItem));
    })

    // all menu list
    const allMenuComponent = allStrapiMenus.edges.map(item => {
        return (
            <div key={item.node.id} >
                <li>
                    <img src={item.node.image_url.publicURL} style={{marginBottom: 0}}/>
                    { `${item.node.menu_name} | ${item.node.price}원 ` }  
                    <input type="checkbox" name="menu" checked={isChecked(checkedMenues,item.node.id)} value={item.node.id} onChange={(e) => addToCart(e)} />
                </li>
            </div>
        )
    })

    // cart list 
    const cartListComponent = cartList.map(item => {
        return (
            <li key={item.node.id}>
               { `${item.node.menu_name} | ${item.node.price}원 ` } <button value={item.node.id} onClick={(e) => addToCart(e)}>취소</button>
            </li>
        )
    });

    // coupon options
    const selectOptions = coupons.map((item,index) => {
        return (
            <option key={index} name={item.name} value={item.percentage}>{item.name} {item.percentage}%</option>
        )
    })

    return (
        <div>
            <h1>Strpi + Gatsby + Redux | Practice</h1>
            <hr />
            <SectionDiv>
                <h2>메뉴 목록</h2>
                <ul>
                    { allMenuComponent }
                </ul>
            </SectionDiv>
            <hr />
            <SectionDiv>
                <h2>장바구니 목록</h2>
                {
                    cartList.length > 0 ? 
                    <ul>
                        {cartListComponent}
                    </ul> : null
                }
            </SectionDiv>
            <hr />
            <SectionDiv>
                <h2>쿠폰이 있다면? select box 연습</h2>
                <select value={selectedCoupon} onChange={(e) => setCoupon(e)}>
                    <option value={0}>----- 없음 -----</option>
                    {selectOptions}
                </select>
            </SectionDiv>
            <hr />
            <SectionDiv>
                <h2>총 금액 합산</h2>
                <div>금액: { tempTotalPrice }원 </div>
            </SectionDiv>
            <hr />
            <SectionDiv>
                <div>
                    <Link to={`/ordercomplete`}>
                        <button disabled={ orderCountLength !== 0 ? false : true }>완료</button>
                    </Link>
                    <button onClick={() => initializeState()}>초기화</button>
                </div>
            </SectionDiv>
        </div>
    )
};

export default Menu;