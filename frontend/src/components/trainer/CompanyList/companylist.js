import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Badge, Descriptions } from 'antd';
import { 
    ChangeCompanySearchText,
    ChangeCompanyTableData,
    ChangeCompanyModalState
} from '../../../actions/adminAction';

function CompanyList(props) {
    useEffect(()=>{
        props.ChangeCompanyTableData();
    }, [])

    var d = props.admin.companyTableData.filter(k=>k._id === props.userDetails.company);
    var data = d.length!==0 ? d[0] : null
    
    return(
        <div style={{margin:'50px'}}>
        <Descriptions title="Информация о компании" bordered column={{ xxl: 2, xl: 1, lg: 1, md: 1, sm:1, xs: 1 }}>
            <Descriptions.Item label="Название">{!data ? null : data.name}</Descriptions.Item>
            <Descriptions.Item label="Логотип">{!data ? null : <img className="display" src={data.logo} style={{height: "60px"}} alt=""/>}</Descriptions.Item>
            {/* <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item> */}
            <Descriptions.Item label="Дата начала действия лицензии">{!data ? null : data.licFromDate}</Descriptions.Item>
            <Descriptions.Item label="Дата окончания действия лицензии" span={4}>
            {!data ? null : data.licToDate}
            </Descriptions.Item>
            <Descriptions.Item label="Контактное лицо" span={4}>
            {!data ? null : data.contact}
            </Descriptions.Item>
            <Descriptions.Item label="Количество лицензированных пользователей">{!data ? null : data.numOfLic}</Descriptions.Item>
            <Descriptions.Item label="Количество использованных учетных записей в рамках лицензии">{!data ? null : data.numOfLicAcc}</Descriptions.Item>
            {/* <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item> */}
            <Descriptions.Item label="Описание">
            {!data ? null : data.descr}
            </Descriptions.Item>
        </Descriptions>
        </div>
        
    )
}

const mapStateToProps = state => ({
    admin : state.admin
});

export default connect(mapStateToProps,{
    ChangeCompanySearchText,
    ChangeCompanyTableData,
    ChangeCompanyModalState
})(CompanyList);