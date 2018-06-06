import React from 'react';
import './QuestionsTemplate.css';

const QuestionsTemplate = ({ top, bot, quesNum, id, visibility, selectedFunc }) => {


    return (
        <div className='questionsContainer'>
          <p id={id + 'qn'} className='questionNumber qn'>{quesNum + ')'}</p>
          <p id={id + 'tn'} className='questionNumber top'>{top}</p><br />
          <p id={id + 'sf'} className='questionNumber ul'>{selectedFunc}</p>
          <p id={id + 'bn'} className='questionNumber ul align'>{bot}</p>
          <input id={id + 'input'} readOnly='true' className='questionInput' type="text" />
          <p style={{ display: visibility, textAlign: 'center', width: '50%', fontSize: '8pt', margin: '0px' }}>Remainder</p>
          <input style={{ display: visibility}} readOnly='true' id={id + 'remainder'} className='remainder' type="text" />
        </div>
    );
};

export default QuestionsTemplate;
