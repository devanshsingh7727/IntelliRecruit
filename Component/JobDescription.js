import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Data from "./Helper";
function CompanyInfoMain({
  CompanyData,
  handelChange,
  ClearCompanyInfo,
  setactiveStep,
  SubmitCompanydata,
  ChangeJD,
}) {
  return (
    <div class='form-container'>
      <form class='form'>
        <ArrowBackIcon
          style={{ color: "rgba(255, 255, 255, 0.6)" }}
          onClick={() => setactiveStep(0)}
        />
        <div class='form-group'>
          <label for='job_description'>Job Description</label>
          <textarea
            onChange={handelChange}
            name='job_description'
            id='job_description'
            rows='10'
            cols='50'
            required=''
            value={CompanyData.job_description}
          >
            {" "}
          </textarea>
        </div>
        <h3 style={{ textAlign: "center" }}> Or</h3>
        <div className='jobsGroup'>
          {Data.data.map((rep, i) => (
            <span class='jobButton' onClick={() => ChangeJD(rep.value)}>
              {rep.name}
            </span>
          ))}
        </div>
        <div class='formButtons'>
          <button
            class={
              CompanyData?.job_description
                ? "form-submit-btnHighlight"
                : "form-submit-btn"
            }
            onClick={(e) => {
              e.preventDefault();
              SubmitCompanydata();
            }}
          >
            Next
          </button>
          <button
            class='form-submit-btn'
            onClick={(e) => {
              e.preventDefault();
              ClearCompanyInfo();
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default CompanyInfoMain;
