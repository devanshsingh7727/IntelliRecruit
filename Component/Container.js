import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { DOMParser } from "@xmldom/xmldom";
import { Configuration, OpenAIApi } from "openai";
import PizZip from "pizzip";
import React, { useState } from "react";
import Swal from "sweetalert2";
import InfoCard from "./InfoCard";
import JobDescription from "./JobDescription";
import LoadingScreen from "./LoadingScreen";
import OutputPage from "./OutputPage";
import ResumeUpload from "./ResumeUpload";
import axiosConnection from "./axioshelper";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function Container() {
  let vertical = "bottom";
  let horizontal = "right";
  const [activeStep, setactiveStep] = useState(0);
  const [GeneratedJson, setGeneratedJson] = useState({});
  const [open, setOpen] = React.useState(false);
  const [CandidateDetails, setCandidateDetails] = useState({
    name: "",
    CurrentCtc: "",
    ExpectedCtc: "",
    resumeData: {
      name: "",
      value: "",
    },
  });
  const [CompanyData, setCompanyData] = useState({
    job_description: "",
  });
  const ChangeJD = (value) => {
    setCompanyData((prevState) => ({ ...prevState, job_description: value }));
  };
  const ClearCompanyInfo = () => {
    setCompanyData({
      job_description: "",
    });
  };
  const ClearCandidateInfo = () => {
    setCandidateDetails({
      name: "",
      CurrentCtc: "",
      ExpectedCtc: "",
      resumeData: {
        name: "",
        value: "",
      },
    });
  };
  const handleResumeData = () => {
    setCandidateDetails((prevState) => ({
      ...prevState,
      resumeData: {
        name: "",
        value: "",
      },
    }));
  };
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handelChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCompanyData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleCandidateInfo = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log(name, value);

    setCandidateDetails((prevState) => ({ ...prevState, [name]: value }));
  };
  const SubmitCompanydata = () => {
    if (CompanyData?.job_description) {
      setactiveStep(2);
    } else {
      handleClick();
    }
  };

  const Gptfunction = async () => {
    if (
      CandidateDetails?.name &&
      CandidateDetails?.CurrentCtc &&
      CandidateDetails?.ExpectedCtc &&
      CandidateDetails?.resumeData?.value
    ) {
      try {
        setactiveStep(3);

        const configuration = new Configuration({
          apiKey: process.env.APIKEY,
        });
        const openai = new OpenAIApi(configuration);
        let prompt = `
        Generate scoring parameters for evaluating a candidate's suitability for a job position. Please provide the following inputs:
        
        1. Job Description:
           - ${CompanyData.job_description}
        
        2. Candidate Details:
           - Please provide the candidate's details:
             - Name: ${CandidateDetails.name} [Candidate's Name]
             - Current CTC (Cost to Company): ${CandidateDetails.CurrentCtc} [Current CTC]
             - Expected CTC: ${CandidateDetails.ExpectedCtc} [Expected CTC]
        
        3. Resume Data:
           - Below is the resume data:
             ${CandidateDetails.resumeData.value}
        
        4. Scoring Parameters (Out of 5):
           - Evaluate and rate the following aspects on a scale of 1 to 5, with 1 being the lowest and 5 being the highest, based on the comparison of the provided job description, candidate details, and resume data:
             - Technical Skills: [Rating out of 5] Please assess the candidate's technical skills in relation to the job description.
             - Communication Skills: [Rating out of 5] Rate the candidate's communication skills based on the job description.
             - Relevance Level: [Rating out of 5] Evaluate and rate how relevant the candidate's skills and experience are to the job description.
        
        Please ensure that you provide a rating for each scoring parameter out of 5, considering the evaluation of the provided job description, candidate details, and resume data.
        
        Example JSON Output Format:
        {
          "Technical_Skills" [Technical Skills]: [Rating],
          "Communication_Skills" [Communication Skills]: [Rating],
          "Relevance_Level" [Relevance Level]: [Rating]
        }
        `;

        const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          max_tokens: 1000,
          messages: [
            {
              role: "system",
              content: `You are an AI assistant tasked with comparing the provided resume data with the given job description and generating a JSON format output.`,
            },
            {
              role: "assistant",
              content: `
              {
                "Technical_Skills" [Technical Skills]: [Rating],
                "Communication_Skills" [Communication Skills]: [Rating],
                "Relevance_Level" [Relevance Level]: [Rating]
              }
              `,
            },
            {
              role: "assistant",
              content: prompt,
            },
          ],
          temperature: 0,
        });

        const generatedContent = response.data.choices[0].message.content;
        setGeneratedJson(JSON.parse(generatedContent));
        setactiveStep(4);
      } catch (err) {
        setactiveStep(0);
        Swal.fire({
          position: "center",
          icon: "error",
          title: err,
        });
      }
    } else {
      handleClick();
    }
  };
  function str2xml(str) {
    if (str.charCodeAt(0) === 65279) {
      str = str.substr(1);
    }
    return new DOMParser().parseFromString(str, "text/xml");
  }

  function getParagraphs(content) {
    const zip = new PizZip(content);
    const xml = str2xml(zip.files["word/document.xml"].asText());

    const paragraphsXml = xml.getElementsByTagName("w:p");

    const paragraphs = [];

    for (let i = 0, len = paragraphsXml.length; i < len; i++) {
      let fullText = "";
      const textsXml = paragraphsXml[i].getElementsByTagName("w:t");

      for (let j = 0, len2 = textsXml.length; j < len2; j++) {
        const textXml = textsXml[j];
        if (textXml.childNodes) {
          fullText += textXml.childNodes[0].nodeValue;
        }
      }
      if (fullText) {
        paragraphs.push(fullText);
      }
    }
    return paragraphs;
  }
  const onFileUpload = (event) => {
    try {
      setactiveStep(3);
      const reader = new FileReader();
      let file = event.target.files[0];

      reader.onload = (e) => {
        const content = e.target.result;
        const paragraphs = getParagraphs(content);
        setCandidateDetails((prevState) => ({
          ...prevState,
          resumeData: {
            name: file.name,
            value: JSON.stringify(paragraphs.toString()),
          },
        }));
      };

      reader.onerror = (err) => console.error(err);

      reader.readAsBinaryString(file);
    } catch (err) {
      setactiveStep(0);
      Swal.fire({
        position: "center",
        icon: "error",
        title: err,
      });
    } finally {
      setactiveStep(2);
    }
  };
  const dataPdfFetch = async (event) => {
    setactiveStep(3);

    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      console.log("formData", formData);
      try {
        const { data } = await axiosConnection.post("/pdfManager", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setCandidateDetails((prevState) => ({
          ...prevState,
          resumeData: {
            name: file.name,
            value: data.test,
          },
        }));
        setactiveStep(2);
      } catch (err) {
        setactiveStep(0);
        Swal.fire({
          position: "center",
          icon: "error",
          title: err,
        });
      }
    }
  };
  const HandleFileUpload = (event) => {
    let file = event.target.files[0];
    let filename = file.name;
    if (/\.pdf$/i.test(filename)) {
      console.log("This is a PDF file.");
      dataPdfFetch(event);
    } else if (/\.docx$/i.test(filename)) {
      console.log("This is a DOCX file.");
      onFileUpload(event);
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "The file type is not recognized.",
      });
    }
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        key={"bottom" + "right"}
      >
        <Alert onClose={handleClose} severity='warning' sx={{ width: "100%" }}>
          Please fill all values!
        </Alert>
      </Snackbar>
      {activeStep == 0 ? (
        <InfoCard setactiveStep={setactiveStep} />
      ) : activeStep == 1 ? (
        <JobDescription
          ClearCompanyInfo={ClearCompanyInfo}
          handelChange={handelChange}
          CompanyData={CompanyData}
          setactiveStep={setactiveStep}
          SubmitCompanydata={SubmitCompanydata}
          ChangeJD={ChangeJD}
        />
      ) : activeStep == 2 ? (
        <ResumeUpload
          activeStep={activeStep}
          setactiveStep={setactiveStep}
          CandidateDetails={CandidateDetails}
          handleCandidateInfo={handleCandidateInfo}
          ClearCandidateInfo={ClearCandidateInfo}
          HandleFileUpload={HandleFileUpload}
          Gptfunction={Gptfunction}
          handleResumeData={handleResumeData}
        />
      ) : activeStep == 3 ? (
        <LoadingScreen setactiveStep={setactiveStep} />
      ) : activeStep == 4 ? (
        <OutputPage
          GeneratedJson={GeneratedJson}
          setactiveStep={setactiveStep}
        />
      ) : null}
    </div>
  );
}

export default Container;
