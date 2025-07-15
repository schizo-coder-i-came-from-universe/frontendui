import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared"
import { Button } from "react-bootstrap"
import { useState } from "react"
import {
    AdmissionInsertAsyncAction,
    PaymentInfoInsertAsyncAction,
    ProgramReadPageAsyncAction,
    ProgramInsertAsyncAction,
    GeneratePaymentInfoInsertParams,
    GenerateAdmissionInsertParams
} from "@blacki005/applicant_page"
import styles from "./DataGenerator.module.css"
/**
 * DataGenerator Component
 * 
 * This component provides functionality to generate random admissions and payment information
 * for a study program. It interacts with asynchronous actions to fetch or insert data and 
 * displays the generated data in a structured format.
 * 
 * @component
 * @returns {JSX.Element} Button for generating data, displays generated data/error when pressed.
 * 
 * @example
 * <DataGenerator />
 * 
 * @description
 * - Fetches available study programs using `ProgramReadPageAsyncAction`.
 * - Generates random payment information and admissions data.
 * - Inserts new program if no programs are available.
 * - Displays the generated payment information and admission details.
 *
 * @functions
 * - `generateRandomSWIFT`: Generates a random SWIFT code.
 * - `generateRandomAmount`: Generates a random payment amount.
 * - `GenerateAdmission`: Handles the generation and insertion of admission and payment info.
 * 
 * @loadingState
 * - Displays a loading message while fetching programs.
 * - Displays an error message if fetching programs fails.
 * 
 * @display
 * - Renders a button to trigger the generation process.
 * - Displays the generated payment information and admission details in JSON format.
 */
export const DataGenerator = () => {
    const { fetch: fetchAdmissionInsert } = useAsyncAction(AdmissionInsertAsyncAction, {}, { deffered: true });
    const { fetch: fetchPaymentInfoInsert } = useAsyncAction(PaymentInfoInsertAsyncAction, {}, { deffered: true });
    const { loading: programsLoading, error: programsError, dispatchResult: programs } = useAsyncAction(ProgramReadPageAsyncAction, {});
    const { fetch: fetchProgramInsert } = useAsyncAction(ProgramInsertAsyncAction, {}, { deffered: true });
    var [paymentInfo, setPaymentInfo] = useState(null);
    var [admission, setAdmission] = useState(null);


    //try to get available programs
    if (programsLoading) {
        return <div>Loading programs...</div>
    }
    if (programsError) {
        return <div>Error fetching study programs: {programsError.message}</div>
    }
    const n_programs = programs?.data?.result?.length || 0;

    const GenerateAdmission = async () => {
        var program = null;
        if (n_programs === 0) {
            //insert new program when there are no programs
            program = await fetchProgramInsert({
                id: crypto.randomUUID(),
                name: "Program " + Math.floor(Math.random() * 1000),
                nameEn: "Program EN " + Math.floor(Math.random() * 1000),
            });
        }
        else {
            //random program from the array of programs
            program = programs?.data?.result[Math.floor(Math.random() * n_programs)];
        }

        //await creating insert parameters
        const paymentInfoInsertParams = await GeneratePaymentInfoInsertParams();
        const admissionInsertParams = await GenerateAdmissionInsertParams(program, paymentInfoInsertParams);

        //insert payment info and admission, set hooks so the values are displayed
        const fetchedPaymentInfo = await fetchPaymentInfoInsert(paymentInfoInsertParams);
        const fetchedAdmission = await fetchAdmissionInsert(admissionInsertParams);
        setPaymentInfo(fetchedPaymentInfo);
        setAdmission(fetchedAdmission);
    }

    // Překlad klíčů pro hezčí popisky v tabulce
    const keyLabels = {
        id: "Identifikátor",
        programId: "Program",
        paymentInfoId: "Platební info",
        name: "Název",
        nameEn: "Název (EN)",
        applicationStartDate: "Začátek přihlášek",
        applicationLastDate: "Konec přihlášek",
        endDate: "Konec řízení",
        conditionDate: "Datum splnění podmínek",
        paymentDate: "Datum platby",
        conditionExtendedDate: "Prodloužené podmínky",
        requestConditionExtendDate: "Žádost o prodloužení podmínek",
        requestExtraConditionsDate: "Žádost o extra podmínky",
        requestExtraDateDate: "Žádost o extra datum",
        examStartDate: "Začátek zkoušek",
        examLastDate: "Konec zkoušek",
        accountNumber: "Číslo účtu",
        specificSymbol: "Specifický symbol",
        constantSymbol: "Konstantní symbol",
        IBAN: "IBAN",
        SWIFT: "SWIFT",
        amount: "Částka",
        studentEntryDate: "Datum přijetí studenta",
        admission: "Přijímací řízení",
        paymentInfo: "Platební informace",
        lastchange: "Poslední změna",

    };

    return (
        <div className={styles.dataGeneratorRoot}>
            <div className={styles.dataGeneratorCenter}>
                <Button onClick={GenerateAdmission}>Generovat přijímací řízení</Button>
            </div>
            {paymentInfo && (
                <div className={styles.dataGeneratorSection}>
                    <h4 className={styles.dataGeneratorHeading}>Platební informace</h4>
                    <div className={styles.dataGeneratorTableScroll}>
                        <table className={styles.dataGeneratorTable}>
                            <thead>
                                <tr>
                                    <th>Název</th>
                                    <th>Hodnota</th>
                                    <th>JSON</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(paymentInfo).map(([key, value]) => (
                                    <tr key={key}>
                                        <th>{keyLabels[key] || key}</th>
                                        <td>{String(value)}</td>
                                        <td>{key}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {admission && (
                <div className={styles.dataGeneratorSection}>
                    <h4 className={styles.dataGeneratorHeading}>Přijímací řízení</h4>
                    <div className={styles.dataGeneratorTableScroll}>
                        <table className={styles.dataGeneratorTable}>
                            <thead>
                                <tr>
                                    <th>Popis</th>
                                    <th>Hodnota</th>
                                    <th>Klíč</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(admission).map(([key, value]) => (
                                    <tr key={key}>
                                        <th>{keyLabels[key] || key}</th>
                                        <td>{String(value)}</td>
                                        <td>{key}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};