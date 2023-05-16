import { CreditScore, CmsContent, InternalBlog, BreadCrumb } from "../../../components/shared";
import { Description } from "./Description";
import { useRouter } from 'next/router';


export const Product = ({data, cmsData, blogsData, productName,rightNavBar, bankName, interLinkingData, attributeData, bankProducts}) => {
  const router = useRouter()
  const loanTypeLoan = router.query.productName
  const name = loanTypeLoan.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())
  const bank = bankName.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());

  let interLinkingIfscArray = {"text": `${bank}'s IFSC Codes`, "child": []};
  attributeData.attributeData.map((data)=> interLinkingIfscArray.child.push({"text": bank + " " + data.name,"path": "/banks-in-india"+ `/${bankName}` + '/ifsc-code' + `/${data.slug}`}))

  let interLinkingDataArray = {"text": `${bank}'s Calculators`,"child": []};
  interLinkingData && interLinkingData.map((data) => interLinkingDataArray.child.push({"text": data.post_title,"path": "/bank-calculator/" + `${bankName}` + "/" + data.path}));
//Other Products by ${bankProduct[0].lenderText}
  let bankProductData = bankProducts.bankProducts.bank_products
  let bankProduct = bankProductData.filter((data)=> data.lenderPath === bankName);
  let loans = bankProduct && bankProduct.length > 0 && bankProduct[0].products.filter((item) => item.productPath !==loanTypeLoan )
  let interLinkingBankArray = {"text":`${bank}'s Other Products`, "child": []};
  loans && loans.map((data) => interLinkingBankArray.child.push({"text": data.productText,"path": `/banks-in-india/${bankName}/${data.productPath}`}));

  let otherBankProduct = bankProductData.filter((data)=> data.lenderPath != bankName);
  let interLinkingOtherBankArray = {"text": `${name} By Other Banks`,"child": []};
  let arraydata1 = otherBankProduct && otherBankProduct.length > 0 && otherBankProduct.map((data) => data.products.map((item) => (item.productPath === loanTypeLoan ? interLinkingOtherBankArray.child.push({"text": data.lenderText + " " + item.productText,"path": `/banks-in-india/${data.lenderPath}/${item.productPath}`}) : null)));
  

    // Loans
    let interLinkingLoanDataArray = {"text": "Loans","child": []};
    let loansPage = rightNavBar.filter((data) =>  data.text === "Loan")
    loansPage[0].child.map((item)=> interLinkingLoanDataArray.child.push({"text": item.text,"path": item.path}))
    
  const internalLinkEmiCalculator = [
    interLinkingBankArray,  
    interLinkingIfscArray.child.length > 0 && interLinkingIfscArray, 
    interLinkingOtherBankArray,
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
  if(loanTypeLoan === 'home-loan'){
    internalLinkEmiCalculator.unshift({
        "text": "Check Eligibility",
        "child": [
          {
            "text": `Home Loan Eligibility Calculator`,
            "path": `/loans/home-loan/eligibility-calculator`
          }
        ]
      })
  }else if(loanTypeLoan === 'personal-loan'){
    internalLinkEmiCalculator.unshift({
        "text": "Check Eligibility",
        "child": [
          {
                  "text": `Personal Loan Eligibility Calculator`,
                  "path": `/loans/personal-loan/eligibility-calculator`
          }
        ]
      })
  }else{
    internalLinkEmiCalculator.unshift({
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
    })
  }
  internalLinkEmiCalculator.unshift(
    {
    "text": "Loan Home Page",
    "child":[
      {
        "text": ` Loan`,
        "path": `/loans`
      }
    ]
    }
  )
  if(loanTypeLoan != 'loan-against-property'){
    internalLinkEmiCalculator.unshift({
      "text": "EMI Calcualtor",
      "child": [
        {
          "text": `${name} EMI Calcualtor`,
          "path": `/loans/${loanTypeLoan}/emi-calculator`
        },
        {
          "text": `${name} Loan Balance Transfer Calulator`,
          "path": `/loans/${loanTypeLoan}/balance-transfer-calculator`
        },
        {
          "text": `${name} Loan Pre Payment Calculator`,
          "path": `/loans/${loanTypeLoan}/pre-payment-calculator`
        }
      ]
    })
  }
  internalLinkEmiCalculator.push(
    {
      "text": "Mutual Fund Scheme",
      "child": [
        {
          "text": `Commodity Fund`,
          "path": `/mutual-funds/commodity`
        },
        {
          "text": `Debt Fund`,
          "path": `/mutual-funds/debt`
        },
        {
          "text": `Equity Fund`,
          "path": `/mutual-funds/equity`
        },
        {
          "text": `Hybrid`,
          "path": `/mutual-funds/hybrid`
        },
        {
          "text": `Tax Saver`,
          "path": `/mutual-funds/tax-saver`
        },
      ]
    },
    {
      "text": "Mutual Fund Sector",
      "child": [
        {
          "text": `Sectoral Mutual Funds`,
          "path": `/mutual-funds/sector`
        }
      ]
    },
    {
      "text": "Gold & Silver Rate",
      "child":[
        {
          "text": `Today Gold Rate`,
          "path": `/gold-rate`
        },
        {
          "text": `Today Silver Rate`,
          "path": `/silver-rate`
        },
      ]
    }
  )

interLinkingLoanDataArray.child.length > 0 && internalLinkEmiCalculator.unshift(interLinkingLoanDataArray);
interLinkingDataArray.child.length > 0 && internalLinkEmiCalculator.unshift(interLinkingDataArray);

  const loanType = data && data[0] ? data[0].productSlug : '';
  const title = data && data[0] ? data[0].plans[0].lenderName + ' ' + data[0].productName : '';
  const breadCrumbLinks = [
    {
      "text": "Banks In India",
      "path": "/banks-in-india",
      "class": ""
    },
    {
      "text": data && data[0] ? data[0].plans[0].lenderName : "",
      "path": data && data[0] ? "/banks-in-india/"+data[0].plans[0].lenderSlug : "",
      "class": ""
    },
    {
      "text": title,
      "path": "/banks-in-india" + (data && data[0] ? "/"+data[0].plans[0].lenderSlug : "") + "/" + loanType,
      "class": ""
    }
  ]
  return (
    <>
    <div className="container">
      <BreadCrumb links={breadCrumbLinks} />
    </div>
    <Description data={data} cmsData={cmsData} productName={productName} loanType={loanType} title={title} />
    <CmsContent productName={name} data={cmsData} rightSideJson = {internalLinkEmiCalculator} path={"/banks-in-india" + (data && data[0] ? "/"+data[0].plans[0].lenderSlug : "") + "/" + loanType} />
    <CreditScore />
    <InternalBlog loanType={name} data={blogsData} />
    </>
  );
}
