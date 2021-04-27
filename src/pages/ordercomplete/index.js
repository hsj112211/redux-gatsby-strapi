import React from 'react';
import { useSelector } from 'react-redux';

const OrderComplete = () => {
    const orderDetail = useSelector(state => state.menues.orderDetail)
    return (
        <div>
            <div>
                총 주문수량: { orderDetail.orderCount }개
            </div>
            <div>
                총 주문금액: { orderDetail.totalPrice }원
            </div>
            <div>
                사용한 쿠폰: { orderDetail.approvedCoupon }%
            </div>
            <div>
                메뉴명 : 
                    {
                        orderDetail.orderMenu.map((item,index) => {
                            return (
                                <div key={ index }>
                                    <div>
                                        <img src={ item.node.image_url.publicURL } style={{ marginBottom:0 }} />
                                    </div>
                                    { item.node.menu_name } | { item.node.price }원
                                </div>
                            )
                        })
                    }
            </div>
            <div>
                합계: { orderDetail.totalPrice }원
            </div>
        </div>
    )
}

export default OrderComplete;