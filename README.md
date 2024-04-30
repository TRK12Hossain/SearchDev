# **Add OriginationLVR to LoanData**

## Status: _Planning / In Progress / Pending Review / Deployed / Paused_

### Start Date: 📆 2024-04-18

### End Date: 📆 2024-04-25

### Implementer: @tarekh10 

### Reviewer: 

### Git Directory (Code): 

[📚 fs-data / mc-gcp-analytics / loan-data /](https://git.realestate.com.au/fs-data/mc-gcp-analytics/tree/main/loan-data)

### Git Directory (Tests):

[📚 fs-data / mc-gcp-analytics / loan-data / tests /](https://git.realestate.com.au/fs-data/mc-gcp-analytics/tree/main/loan-data/tests)

## **Change Background:**

The table `LoanProductData` has been replaced with `LoanData` . The aim of this change is to add `OriginationLVR` field to the `LoanData` table for both **MC** and **SL** records. 

## **Deliveribles:**

| Assets/Tables | Current | Requirements |
| - | - | - |
| Updated `LoanData` table in BQ |  |  |
| Updated `loan-data.sql` in Git |  |  |

## **Impact and Risk Assesment:** _(Tentative)_

| Assets/Tables | Impact | Risk | Risk Severity |
| - | - | - | - |
|  |  |  |  |
|  |  |  |  |

## **Implementation Steps:**

| Task | Description | Resources |
| - | - | - |
| Research/Find the **LVR** Field for **SL**   | Identify which table has LVR for SL records Investigate the sql to derive LVR Find a way to join with `mc-data-lake-prod-2.SMARTLINE_PROD.Loan` table (if required)   |  |
| Ensure to have it at a Loan Level   | Not application level |  |
| Conditionally use **MC/BP** id over **SL** ids   | As it was done previously while doing the `LoanData` implementation |  |
| Add SQL for **MC** records to `LoanData`   | Example of deriving **LVR** for **MC** records → | SELECT
  CoreLoan.Id AS LoanId,
  CoreScenarioTransactionSummary.TotalLVR,
FROM \`mc-data-lake-prod-2.STATIC_TABLES.CoreLoan\` CoreLoan
LEFT JOIN \`mc-data-lake-prod-2.STATIC_TABLES.CoreLoanApplication\` CoreLoanApplication
  ON CoreLoan.LoanApplicationId = CoreLoanApplication.Id
LEFT JOIN \`mc-data-lake-prod-2.STATIC_TABLES.CoreScenario\` CoreScenario
  ON CoreLoanApplication.ScenarioId = CoreScenario.Id
LEFT JOIN \`mc-data-lake-prod-2.STATIC_TABLES.CoreScenarioTransactionSummary\` CoreScenarioTransactionSummary
  ON CoreScenario.Id = CoreScenarioTransactionSummary.ScenarioId
ORDER BY CoreLoan.Id desc  |
| Add SQL for **SL** records to `LoanData`   |  |  |
| Confirm the data type of LVR coloumn   | int64 or a float, check both MC and SL sources**MC**: `CoreScenarioTransactionSummary.TotalLVR` *Float* **SL:** `Application.application_lvr`\_ Numeric\_   Self service Clare/Yash in the first instance**MC** ✅ **SL** …   Spread across milestone tables in FY24 (@:58c7b5f46b9629431b735dc0 ) Eventually into the dashboards (no know when) (@:59ed4bcc676f5b3fa17d5bc0 )   | ***Circa* 202211** Let’s make it an `int64` and lose the decimal places Ooopa look it adds a lot of time Because LVR demands two new big table joins i. `STAGING_TABLES_BP.ScenarioBP` ii. `STAGING_TABLES_BP.ScenarioTransactionSummaryBP` SL values are wild, there are some 0s and some 00000   |
| Create a feature branch `origination-lvr` in Git   | Commit the codes in the feature branch and create a PR for review |  |
| Create/Replace `LoanData` view in BQ   | Run the latest query in BQ |  |

## **Test Plan:**

| Test Case Description | Expected Results | Actual Results | Remarks |
| - | - | - | - |
|  |  |  |  |
|  |  |  |  |

## **Backup and Rollback Plan:** _(Tentative)_

| Assets/Tables | Backup Details | Rollback Steps |
| - | - | - |
|  |  |  |
|  |  |  |

## **Post-Implementation Checklist:**

- [ ] Confirm the feature branches are merged and closed
- [ ] Confirm BQ tables are updated and reflect the changes
- [ ] Confirm BQ and Git codes are synced  
- [ ] Communicate the deployment with the Dashboard team
- [ ] Complete and finalize the CIP

