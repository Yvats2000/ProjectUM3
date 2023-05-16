import { PrePayment, BalanceTransfer, Eligibility, Emi } from "../";
import { Page404 } from "../../errorPage";

import BalanceTransferCalculation from '../../../data/businessLoanBalanceTransferCalculation.json';
import PrePaymentCalculation from '../../../data/businessLoanPrePaymentCalculation.json';
import EmiCalculation from '../../../data/businessLoanEmiCalculation.json';
const title = 'Business Loan';
export function BusinessLoan({calculatorType, loanType,cmsData, blogsData, rightNavBar}) {
  switch (calculatorType) {
    // case 'eligibility-calculator':
    // return (
    //   <Eligibility loanType={loanType} calculatorType={calculatorType} title={title} FaqData={EligibilityFaq}/>
    // )
    case 'emi-calculator':
    return (
      <Emi cmsData={cmsData} loanType={loanType} calculatorType={calculatorType} title={title} calculation={EmiCalculation} blogsData={blogsData} rightNavBar={rightNavBar} />
    )
    case 'balance-transfer-calculator':
    return (
      <BalanceTransfer cmsData={cmsData} loanType={loanType} calculatorType={calculatorType} title={title}  calculation={BalanceTransferCalculation} blogsData={blogsData} rightNavBar={rightNavBar} />
    )
    case 'pre-payment-calculator':
    return (
      <PrePayment cmsData={cmsData} loanType={loanType} calculatorType={calculatorType} title={title}  calculation={PrePaymentCalculation} blogsData={blogsData} rightNavBar={rightNavBar} />
    )
    default:
    return (
      <Page404/>
    );
  }
}
