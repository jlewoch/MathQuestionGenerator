import React from 'react';
import './NavigationBar.css'
import Timer from '../timer/Timer';
const NavigationBar = ({ disp, navClick, numofques, val, maxNum, minNum, maxVal, minVal, correct }) => {


    return (
        <div className='navContainer'>

          {/* navigation links */}
          <li onClick={navClick} value={0} className='navLink'>Multiplication</li>
          <li onClick={navClick} value={1} className='navLink'>Division</li>
          <li onClick={navClick} value={2} className='navLink'>Addition</li>
          <li onClick={navClick} value={3} className='navLink'>Subtraction</li>

          {/* total questions */}
          <label style={{ fontWeight: 'Bold', fontSize: '10pt' }} htmlFor="totalQuestions"># of Questions</label>
          <select onChange={numofques} default='Select' name='totalQuestions' style={{ borderRadius: '12px'}} type="text">
            <option>{10}</option>
            <option>{20}</option>
            <option>{30}</option>
            <option>{40}</option>
            <option>{50}</option>
            <option>{60}</option>
            <option>{70}</option>
            <option>{80}</option>
            <option>{90}</option>
            <option>{100}</option>
          </select>

          {/* Min and Max numbers */}
          <div style={{ height: '100%', display: 'Block', width: '110px' }} >
            <label style={{ fontWeight: 'Bold', fontSize: '10pt' }} htmlFor="max">Max #</label>
            <input onChange={maxNum} maxLength='7' name='max' style={{ borderRadius: '12px', width: '50px', padding: '5px' }} type="text" value={maxVal} />

            <label style={{ fontWeight: 'Bold', fontSize: '10pt' }} htmlFor="min">Min #</label>
            <input onChange={minNum} maxLength='7' name='min' style={{ borderRadius: '12px', width: '50px', padding: '5px' }} type="text" value={minVal} />
          </div>

          {/* score and percentage */}
          <div style={{ height: '100%', display: 'Block', width: '20px' }} >
            <p style={{fontSize: '10pt', fontWeight: 'bold', margin: '0px', borderBottom: 'solid 2px black'}} >{correct}</p>
            <p style={{fontSize: '10pt', fontWeight: 'bold', margin: '0px'}} >{val}</p>
            <p style={{fontSize: '10pt', fontWeight: 'bold', margin: '0px'}} >{Math.round(correct / val * 100) + '%'}</p>
          </div>

          <Timer totalQuestions={val}/>



        </div>
    );
};

export default NavigationBar;
