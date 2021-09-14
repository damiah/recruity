// import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function EmployeeListItemExtended({ employeeItem }) {

  const { userName, currentJobTitle, currentEmployer, cityId } = employeeItem;
  console.log(employeeItem);
  const handleDelete = () => {
    console.log('Event H called');
  }

  return (
    <div className='job-item p-4 border rounded-2  shadow'>
      <div className='d-flex justify-content-between'>
        <div className='d-flex align-items-center'>
          <i className='bi bi-briefcase fs-1 me-3 text-muted' />
          <div>
            <div className='fw-bold fs-5'>{userName}</div>
            <div className='text-primary fw-bold me-1'>
              <span className='badge bg-secondary mx-1'>{currentJobTitle}</span>
              <span className='badge bg-secondary'>{currentEmployer}</span>
              <button className="btn btn-success btn-sm m-2" onClick={handleDelete}>Save</button>
            </div>
            <div className='fw-light'>
              {cityId}
            </div>
          </div>
        </div>
        <div className='text-end align-text-bottom'>
          <div className='text-primary fw-bold'>Price</div>
          <div className='text-secondary'>
            $100 p/h
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-between align-items-center mt-2'>
        <div>
          <div className='text-muted center m-0'>
            Personal Description
            {/* <personalDescription text> */}
          </div>
        </div>
        <div className='vertical-align'>
        <Link className='btn btn-secondary rounded' to='/'>
            Resume
          </Link>
          <Link className='btn btn-primary rounded' to='/'>
            Message Me
          </Link>
        </div>
      </div>
    </div>
  );
}