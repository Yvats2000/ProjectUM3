import { Description } from "./Description";
import { CreditScore, CmsContent, InternalBlog, Table, BreadCrumb } from "../../../components/shared";
import { EligibilityLeadForm } from "../../../components/calculator";
import React, {useState} from 'react';
import { useRouter } from 'next/router';


export const Bank = ({data, cmsData, blogsData, interLinkingData, topBanks, attributeData}) => {
  const router = useRouter()
  const [loanType, setLoanType] = useState('home-loan');
  const bankName = router.query.bankName
  let name = Object.keys(topBanks)
  let key = name[0].split('_').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  let interLinkingDataArray = {"text": bankName.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()) + ' Calculators',"child": []};
  interLinkingData && interLinkingData.map((data) => interLinkingDataArray.child.push({"text": data.post_title,"path": "/bank-calculator/" + `${bankName}` + "/" + data.path}));
  // Ifsc Box
  let interLinkingIfscArray = {"text": `${bankName.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())} IFSC Codes`, "child": []};
  attributeData.attributeData.map((data)=> interLinkingIfscArray.child.push({"text": bankName.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()) + " " +data.name,"path": "/banks-in-india"+ `/${bankName}` + '/ifsc-code' + `/${data.slug}`}))
//topTenBank Box
  let banksArray = topBanks.top_banks.filter((data) =>  data.path !== bankName)
  let interLinkingBankArray = {"text": key, "child": []};
  banksArray.map((data)=> interLinkingBankArray.child.push({"text": data.text,"path": "/banks-in-india/" + data.path}))
  
  const internalLinkEmiCalculator = [
    {
      "text": "Check Eligibility",
      "child": [
        {
          "text": `Home Loan Eligibility Calculator`,
          "path": `/loans/home-loan/eligibility-calculator`
        },
        {
          "text": `Personal Loan Eligibility Calculator`,
          "path": `/loans/personal-loan/eligibility-calculator`
        }
      ]
    },
    {
        "text": "Financial Calculators",
        "child": [
          {
            "text": "SIP Calculator",
            "path": "/calculator/sip-calculator"
          },
          {
            "text": "FD Calculator",
            "path": "/calculator/fd-calculator"
          },
          {
            "text": "HRA Calculator",
            "path": "/calculator/hra-calculator"
          },
          {
            "text": "Gratuity Calculator",
            "path": "/calculator/gratuity-calculator"
          }
        ]
      }
  ]

  interLinkingDataArray.child.length > 0 && internalLinkEmiCalculator.unshift(interLinkingDataArray);
  interLinkingBankArray.child.length > 0 && internalLinkEmiCalculator.unshift(interLinkingBankArray);
  interLinkingIfscArray.child.length > 0 && internalLinkEmiCalculator.unshift(interLinkingIfscArray);
  const breadCrumbLinks = [
    {
      "text": "Banks In India",
      "path": "/banks-in-india",
      "class": ""}, 
    {
      "text": data ? data.lenderName : "",
      "path": data ? "/banks-in-india/" + data.lenderSlug   : "",
      "class": ""
    }
  ]
  return (
    <>
    <div className="container">
      <BreadCrumb links={breadCrumbLinks} />
    </div>
    <Description data={data} />
    <section className="elegibiltyForm">
      <div className='container'>
        <EligibilityLeadForm loanType={loanType} setLoanType={setLoanType} title={data.lenderName + ' ' + 'Loan'} tabs={true} /> 
      </div>
    </section>
    <Table data={data && data.products ? data : []} title={data ? 'Loans offered by ' + data.lenderName : ''}/>
    <CmsContent data={cmsData} rightSideJson={internalLinkEmiCalculator} path={data ? "/banks-in-india/" + data.lenderSlug   : ""} />
    <CreditScore />
    <InternalBlog data={blogsData} />
    </>
  );
}
