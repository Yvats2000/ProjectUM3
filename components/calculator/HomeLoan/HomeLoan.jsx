import { PrePayment, BalanceTransfer, Eligibility, Emi } from "../";
import { Page404 } from "../../errorPage";
import BalanceTransferCalculation from '../../../data/homeLoanBalanceTransferCalculation.json';
import PrePaymentCalculation from '../../../data/homeLoanPrePaymentCalculation.json';
import EmiCalculation from '../../../data/homeLoanEmiCalculation.json';
const title = 'Home Loan';
export function HomeLoan({calculatorType, loanType ,cmsData, blogsData, rightNavBar}) {
  switch (calculatorType) {
    case 'eligibility-calculator':
    return (
      <Eligibility cmsData={cmsData} loanType={loanType} calculatorType={calculatorType} title={title} blogsData={blogsData} rightNavBar={rightNavBar} />
    )
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
