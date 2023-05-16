import { HomeLoan, PersonalLoan, BusinessLoan } from "../";
import { Page404 } from "../../errorPage";
export function ParentFile({loanType, calculatorType,cmsData, blogsData,rightNavBar}) {
  switch (loanType) {
    case 'home-loan':
    return (
      <HomeLoan calculatorType={calculatorType} loanType={loanType} cmsData={cmsData} blogsData={blogsData} rightNavBar={rightNavBar}/>
    )
    case 'personal-loan':
    return (
      <PersonalLoan calculatorType={calculatorType} loanType={loanType} cmsData={cmsData} blogsData={blogsData} rightNavBar={rightNavBar} />
    )
    case 'business-loan':
    return (
      <BusinessLoan calculatorType={calculatorType} loanType={loanType} cmsData={cmsData} blogsData={blogsData} rightNavBar={rightNavBar}/>
    )
    default:
    return (
      <Page404/>
    );
  }
}
