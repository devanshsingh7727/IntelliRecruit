import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
function MainContainer({
  setactiveStep,
  handleCandidateInfo,
  ClearCandidateInfo,
  CandidateDetails,
  HandleFileUpload,
  Gptfunction,
  handleResumeData,
}) {
  return (
    <div class='form-container'>
      <ArrowBackIcon
        style={{ color: "rgba(255, 255, 255, 0.6)", float: "left" }}
        onClick={() => setactiveStep(1)}
      />
      <div class='form-group'>
        <label for='name'>Candidate's Name</label>
        <input
          onChange={handleCandidateInfo}
          type='text'
          id='name'
          name='name'
          value={CandidateDetails.name}
          required=''
        />
      </div>
      <div class='form-group'>
        <label for='CurrentCtc'>Current Salary</label>
        <input
          onChange={handleCandidateInfo}
          type='number'
          id='CurrentCtc'
          name='CurrentCtc'
          value={CandidateDetails.CurrentCtc}
          required=''
        />
      </div>
      <div class='form-group'>
        <label for='ExpectedCtc'>Expected Salary</label>
        <input
          onChange={handleCandidateInfo}
          type='number'
          id='ExpectedCtc'
          name='ExpectedCtc'
          value={CandidateDetails.ExpectedCtc}
          required=''
        />
      </div>
      {!CandidateDetails.resumeData.value ? (
        <form class='formUpload'>
          <div class='input-div'>
            <input
              class='input'
              name='file'
              type='file'
              onChange={HandleFileUpload}
            />
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='1em'
              height='1em'
              stroke-linejoin='round'
              stroke-linecap='round'
              viewBox='0 0 24 24'
              stroke-width='2'
              fill='none'
              stroke='currentColor'
              class='icon'
            >
              <polyline points='16 16 12 12 8 16'></polyline>
              <line y2='21' x2='12' y1='12' x1='12'></line>
              <path d='M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3'></path>
              <polyline points='16 16 12 12 8 16'></polyline>
            </svg>
          </div>
          <button
            data-text='Awesome'
            class='button'
            type='submit'
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <span class='actual-text'>&nbsp;Upload Resume!&nbsp;</span>
            <span class='hover-text' aria-hidden='true'>
              &nbsp;Upload Resume!&nbsp;
            </span>
          </button>
          <p>as .pdf or .docx file</p>
        </form>
      ) : (
        <div className='chipbutton' onClick={handleResumeData}>
          {CandidateDetails.resumeData.name} <CloseIcon />
        </div>
      )}
      <div class='formButtons'>
        <button
          class={
            CandidateDetails.name &&
            CandidateDetails.CurrentCtc &&
            CandidateDetails.ExpectedCtc &&
            CandidateDetails.resumeData.value
              ? "form-submit-btnHighlight"
              : "form-submit-btn"
          }
          onClick={(e) => {
            e.preventDefault();
            Gptfunction();
          }}
        >
          Next
        </button>
        <button
          class='form-submit-btn'
          onClick={(e) => {
            e.preventDefault();
            ClearCandidateInfo();
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default MainContainer;
