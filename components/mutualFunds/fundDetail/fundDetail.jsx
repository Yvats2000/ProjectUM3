import React, { useEffect, useState, useRef } from "react";
import style from './fundDetail.module.css';
import contentStyles from "../../shared/CmsContent/CmsContent.module.css";
import { CalculateInvestment } from "../homePage/calculateInvestment";
import TopSection from "./topSection/topSection";
import FundOverview from "./fundOverview/fundOverview";
import FundPortfolio from "./fundPortfolio/FundPortfolio";
import FundTableScheme from "./fundTableScheme/fundTableScheme";
import { BreadCrumb, CreditScore, RightSideBar, FAQ } from "../../shared";
import CompareFund from "./comparefund/comparefund";
import { graphApi } from "../../../services/mutualFunds";
import GraphSection from "./Graph/GraphSection";

const getDimensions = (ele, value) => {
  const { height } = ele !== null ? ele.getBoundingClientRect() : 400
  const offsetTop = ele !== null ? ele.offsetTop : 100;
  const offsetBottom = offsetTop + height;
  return {
    height,
    offsetTop,
    offsetBottom,
  };
};
export const FundDetail = ({ DetailData,graphData=[], calculations, schemeSlug, fundsAmc, tableData, mutualFundsTabs, cmsData = [], amcData, category }) => {
  const amcName = fundsAmc.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const schemeName = schemeSlug.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const schemeBank = schemeSlug.split('-')[0].replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const categoryHead = category.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const schemeCode =  DetailData && DetailData.schemeDetail && DetailData.schemeDetail.schemecode
  const [afterClickScroll, setAfterClickScroll] = useState(true)
  const [visibleSection, setVisibleSection] = useState();
  const [monthGraph, setMonthGraph] = useState('1')
  const [schemeGraph, setSchemeGraph] = useState(graphData)
  const { peerComparison } = DetailData || {}
  let dropData = { data: [...peerComparison] }

  useEffect(async()=>{
    let data = await graphApi(schemeCode,monthGraph)
    setSchemeGraph(data)
  },[monthGraph])
  const handleClick = (e, id) => {
    // setActiveTab(index);
    const violation = document.getElementById(id);
    window.scrollTo({
      top: violation.offsetTop - 200,
      behavior: "smooth"
    });
    window.history.replaceState(null, "", "#" + id)
  };
  const updateKey = (value) => {
    return value.split(" ").join("-")
  }
  const breadCrumbLinks = [
    {
      "text": `Mutual Funds`,
      "path": `/mutual-funds`,
      "class": ""
    },
    {
      "text": `AMC`,
      "path": `/mutual-funds/amc`,
      "class": ""
    },
    {
      "text": amcName,
      "path": `/mutual-funds/${fundsAmc}`,
      "class": ""
    },
    {
      "text": schemeName,
      "path": `/mutual-funds/${fundsAmc}/${schemeSlug}`,
      "class": ""
    }
  ];

  let schemeRelatedDataArray = { "text": `Top ${schemeBank} ${categoryHead} Funds`, "child": [] };
  amcData.data.filter((d1) => d1.asset_type == category)[0].data.filter((item) => item.schemeSlug !== schemeSlug).map((item) => schemeRelatedDataArray.child.push({ "text": item.scheme_name, "path": `/mutual-funds/${fundsAmc}/` + item.schemeSlug }))

  const headerRef = useRef(null);
  const leadershipRef = useRef(null);
  const NavHistory = useRef(null)
  const providerRef = useRef(null);
  const operationsRef = useRef(null);
  const calculatorRef = useRef(null);

  const sectionRefs = [
    { section: "Fund-Overview", ref: leadershipRef },
    { section: "Nav-History", ref: NavHistory },
    { section: "Fund-Portfolio", ref: providerRef },
    { section: "Peer-Comparison", ref: operationsRef },
    { section: "Calculator", ref: calculatorRef }
  ];
  useEffect(() => {
    const handleScroll = () => {
      const { height: headerHeight } = getDimensions(headerRef.current, afterClickScroll);
      const scrollPosition = window.scrollY + headerHeight + 300;

      const selected = sectionRefs.find(({ section, ref }) => {
        const ele = ref.current;
        if (ele) {
          const { offsetBottom, offsetTop } = getDimensions(ele, afterClickScroll);
          return scrollPosition > offsetTop && scrollPosition < offsetBottom;
        }
      });

      if (selected && selected.section !== visibleSection) {
        setVisibleSection(selected.section);
      } else if (!selected && visibleSection) {
        setVisibleSection(undefined);
      }
    };
    if (afterClickScroll) {
      handleScroll();
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [visibleSection]);
  return (
    <>
      <div className="container">
        <BreadCrumb links={breadCrumbLinks} />
      </div>
      <TopSection schemeDetail={DetailData && DetailData.schemeDetail} />
      {/* <Tabs data={mutualFundsTabs}/> */}
      <section className={`${style.tabSection}`}>
        <div className={`${style.tabElement} container`} ref={headerRef}>
          <ul>
          <a href={`${process.env.BASE_URL}/mutual-funds/${fundsAmc}/${schemeSlug}#FO`}>
            <li className={`${visibleSection === "Fund-Overview" ? style.active : ""}`}onClick={(e) => handleClick(e,"Fund-Overview")}>Fund Overview</li>
            </a>
            {graphData && graphData.graphHistory && graphData.graphHistory.length > 0 && 
            <a href={`${process.env.BASE_URL}/mutual-funds/${fundsAmc}/${schemeSlug}#NH`}>
            <li className={`${visibleSection === "Nav-History" ? style.active : ""}`} onClick={(e) => handleClick(e,"Nav-History")}>NAV History</li>
            </a>}
            {DetailData && DetailData.allocation && DetailData.allocation && (DetailData.allocation.holdings.length > 0 || DetailData.allocation.sectors.length > 0) &&
            <a href={`${process.env.BASE_URL}/mutual-funds/${fundsAmc}/${schemeSlug}#FP`}>
            <li className={`${visibleSection === "Fund-Portfolio" ? style.active : ""}`}onClick={(e) => handleClick(e,"Fund-Portfolio")}><a>Fund Portfolio</a></li>
            </a>}
            { tableData.length > 0 &&
            <a href={`${process.env.BASE_URL}/mutual-funds/${fundsAmc}/${schemeSlug}#PC`}>
            <li className={`${visibleSection === "Peer-Comparison" ? style.active : ""}`} onClick={(e) => handleClick(e,"Peer-Comparison")}><a >Peer Comparison</a></li>
            </a>}
              <a href={`${process.env.BASE_URL}/mutual-funds/${fundsAmc}/${schemeSlug}#Cal`}>
            <li className={`${visibleSection === "Calculator" ? style.active : ""}`} onClick={(e) => handleClick(e,"Calculator")}><a >Calculator</a></li>
            </a>
          </ul>
        </div>
      </section>
      <FundOverview DetailData={DetailData} leadershipRef={leadershipRef} id="#FO"/>
      {graphData && graphData.graphHistory && graphData.graphHistory.length > 0 && 
      <GraphSection NavHistory={NavHistory} schemeName={DetailData && DetailData.schemeDetail.scheme_name} schemeGraph={schemeGraph} setMonthGraph={setMonthGraph} monthGraph={monthGraph} id='Nav-History'/>}
      {DetailData && DetailData.allocation && DetailData.allocation && (DetailData.allocation.holdings.length > 0 || DetailData.allocation.sectors.length > 0) && 
        <FundPortfolio id="#FP" allocation={DetailData && DetailData.allocation} providerRef={providerRef}/>}
      {tableData.length > 0 && <FundTableScheme id="#PC" data={dropData} schemeDetail={DetailData && DetailData.schemeDetail} newtableData={tableData} operationsRef={operationsRef} /> }
      <CalculateInvestment id="#Cal" calculations={calculations} calculatorRef={calculatorRef}/>
      <CreditScore />
      {DetailData && DetailData.peerComparison.length > 0 && <CompareFund DetailData={DetailData && DetailData} schemeSlug={schemeSlug} />}
      {cmsData.length > 0 &&
        <>
          <div className="container containerFlex mb40">
            <section className={contentStyles.eligible}>
              <div className="container">
                <div dangerouslySetInnerHTML={{ __html: cmsData[0].post_content }} className="mt35"></div>
              </div>
            </section>
            
          </div>
          {cmsData[0].isFAQ && cmsData[0].faq_content && cmsData[0].faq_content.length > 0 ?
            <section className="faq">
              <div className="container">
                <h2 className="faqHeading font24">{cmsData[0].faq_name}</h2>
                <div className="faqBx">
                  <FAQ data={cmsData[0].faq_content} />
                </div>
              </div>
            </section>
            : null}
        </>}
    </>
  )
}