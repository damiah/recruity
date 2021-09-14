import React, { useCallback, useEffect, useMemo, useState } from "react";
import EmployeeListItemExtended from "./JobAdvertsListItemExtended";
// import JobSeekerService from "../../services/jobSeekerService";
import { Link } from "react-router-dom";

export default function EmployeeListItem({ employeeItem }) {
  const { id, userName, currentJobTitle, currentEmployer, cityId } = employeeItem;
  const [showResults, showFullProfile] = useState(false);

  const handleClick = () => {
    showResults ? showFullProfile(false) : showFullProfile(true)
  }

  return (
    <div>
      <div className='col-md-5 px-4 m-3' onClick={handleClick}>
      { showResults ? <EmployeeListItemExtended key={id} employeeItem = {employeeItem} /> : 
        <div className='job-item p-4 border rounded-2  shadow'>
          <div className='d-flex justify-content-between'>
            <div className='d-flex align-items-center'>
              <i className='bi bi-briefcase fs-1 me-3 text-muted' />
              <div>
                <div className='fw-bold fs-5'>{userName}</div>
                <div className='text-primary fw-bold me-1'>
                  {/* Open Positions  */}
                  <span className='badge bg-secondary mx-1'>{currentJobTitle}</span>
                  <span className='badge bg-secondary'>{currentEmployer}</span>
                  <button className="btn btn-success btn-sm m-2">Save</button>
                </div>
                </div>
            </div>
          </div>
        </div>
        }
      </div>
    </div>
  );
}