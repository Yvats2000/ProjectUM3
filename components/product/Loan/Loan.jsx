import { CreditScore, CmsContent, InternalBlog, BreadCrumb } from "../../shared";
import { Description } from "./Description";
import { useRouter } from 'next/router';


export const Loan = ({data, cmsData, blogsData, rightNavBar, attributeData, bankProducts, productTop10Bank, interLinkingData}) => {
  const router = useRouter()
  const loanTypeLoan = router.query.loanType
  const name = loanTypeLoan.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())

  //Articles based upon category box
  let interLinkingDataArray = {"text": 'About ' + name,"child": []};
  interLinkingData && interLinkingData.filter(item => item.path != null && item.path != 'interest-rate' && item.post_title != null).map((data) => interLinkingDataArray.child.push({"text": data.post_title,"path": "/loans/" + loanTypeLoan + "/" + data.path}));

  // Investment
  let interLinkingInvestmentArray = {"text": "Investment","child": []};
  rightNavBar.filter((data) =>  data.text === "Investment").map(data => data.child.map((item)=> interLinkingInvestmentArray.child.push({"text": item.text,"path": item.path})))

  //Interest Rates

  let interLinkingInterestRateDataArray = {"text": "Interest Rates","child": [
    {
      "text": `Home Loan Interest Rate`,
      "path": `/loans/home-loan/interest-rate`
    },
    {
      "text": `Personal Loan Interest Rate`,
      "path": `/loans/personal-loan/interest-rate`
    }
  ]};

  // Loans
  let interLinkingLoanDataArray = {"text": "Loans","child": []};
  let loans = rightNavBar.filter((data) =>  data.text === "Loan")
  loans[0].child.filter((d1)=> d1.text !== name).map((item)=> interLinkingLoanDataArray.child.push({"text": item.text,"path": item.path}))
  
  //ifsc array 
  let filterIfscData =  attributeData.attributeData.slice(0,10)
  let interLinkingIfscArray = {"text": `Ifsc Codes`, "child": []};
  filterIfscData.map((data)=> interLinkingIfscArray.child.push({"text": data.lenderName,"path": "/banks-in-india"+ `/${data.lenderSlug}` + '/ifsc-code'}))

  //product calculator
  let interLinkingProductCal = {"text": `${name} Calculator`, "child": []};
  let filterArray = bankProducts.bank_calculators.map((data) => data.calculators.map((item) => (item.calculatorPath === loanTypeLoan+'-calculator' ? interLinkingProductCal.child.push({"text": data.lenderText + " " + item.calculatorText + " Calculator","path": `/bank-calculator/${data.lenderPath}/${item.calculatorPath}`}) : null)));

  //Product top banks
  let interLinkingProductTopBanks = {"text": `${name} Top Banks`, "child": []};
  productTop10Bank.map((item)=> interLinkingProductTopBanks.child.push({"text": item.text + " " + name,"path": "/banks-in-india"+ `/${item.path}` + `/${loanTypeLoan}`}))
  
  const internalLinkEmiCalculator = [interLinkingProductCal, interLinkingProductTopBanks]
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
  } else{
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
    "text": "Top 10 Banks",
      "child": [
        {
          "text": "IDFC FIRST Bank",
          "path": "/banks-in-india/idfc-first-bank"
        },
        {
          "text": "HDFC Bank",
          "path": "/banks-in-india/hdfc-bank"
        },
        {
          "text": "Axis Bank",
          "path": "/banks-in-india/axis-bank"
        },
        {
          "text": "kotak Bank",
          "path": "/banks-in-india/kotak-bank"
        },
        {
          "text": "ICICI Bank",
          "path": "/banks-in-india/icici-bank"
        },
        {
          "text": "Yes Bank",
          "path": "/banks-in-india/yes-bank"
        },
        {
          "text": "IndiaBulls",
          "path": "/banks-in-india/indiabulls"
        },
        {
          "text": "Deutsche Bank",
          "path": "/banks-in-india/deutsche-bank"
        },
        {
          "text": "Standard Chartered Bank",
          "path": "/banks-in-india/standard-chartered-bank"
        },
        {
          "text": "L&T Finance",
          "path": "/banks-in-india/lt-finance"
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

interLinkingInvestmentArray.child.length > 0 && internalLinkEmiCalculator.unshift(interLinkingInvestmentArray);
interLinkingLoanDataArray.child.length > 0 && internalLinkEmiCalculator.unshift(interLinkingLoanDataArray);
interLinkingInterestRateDataArray.child.length > 0 && internalLinkEmiCalculator.unshift(interLinkingInterestRateDataArray);
interLinkingIfscArray.child.length > 0 && internalLinkEmiCalculator.unshift(interLinkingIfscArray);
interLinkingDataArray.child.length > 0 && internalLinkEmiCalculator.unshift(interLinkingDataArray);

  const loanType = data && data[0] ? data[0].productSlug : '';
  const title = data && data[0] ? data[0].productName : '';
  const breadCrumbLinks = [
    {
      "text": 'Loans',
      "path": "/loans",
      "class": ""
    },
    {
      "text": title,
      "path": "/loans/"+ loanType,
      "class": ""
    }
  ]
  return (
    <>
    <div className="container">
      <BreadCrumb links={breadCrumbLinks} />
    </div>
    <Description data={data} loanType={loanType} title={title} />
    <CmsContent data={cmsData} rightSideJson = {internalLinkEmiCalculator} path={"/loans/"+ loanType} productName={title}/>
    <CreditScore />
    <InternalBlog loanType={name} data={blogsData} />
    </>
  );
}
