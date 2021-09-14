import "./JobAdvertsList.scss";
import * as Yup from "yup";

import { Form, Formik } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import CityService from "../../services/cityService";
import FormSelect from "../FormSelect/FormSelect";
import JobAdvertService from "../../services/jobAdvertService";
import EmployeeListItem from "./JobAdvertsListItem";
import EmployeeListItemExtended from "./JobAdvertsListItemExtended";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import WorkingTimeService from "../../services/workingTimeService";
import lodash from "lodash";

export default function JobAdvertsList({ size = 10, pagination = true }) {
  // define employee data
  const [employeesData, fetchAllEmployees] = useState([]);
  const loadEmployeesData = async () => {
      const res = await fetch('employees');
      const data = await res.json();
      const employeesData = fetchAllEmployees(data);
  }
  // define locations data
  const [locationsData, fetchAllLocations] = useState([]);
  const loadLocationsData = async () => {
    const res = await fetch('locations');
    const data = await res.json();
    const locationsData = fetchAllLocations(data);
  }

  const [employersData, fetchAllEmployers] = useState([]);
  const loadEmployersData = async () => {
    const res = await fetch('employers');
    const data = await res.json();
    const employersData = fetchAllEmployers(data);
  }

  // JOB ALERT SERVICE //
  const [jobAdverts, setJobAdverts] = useState(null),
    [filter, setFilter] = useState(null),
    // create a memorised value / list based on new instance of JobAdvertService()
    jobAdvertService = useMemo(() => new JobAdvertService(), []),
    getAllByIsActiveForList = useCallback(
      async (pageNumber = 0, pageSize = 10) => {
        const result = await jobAdvertService.getAllByIsActiveForList(true, pageNumber, pageSize);
        if (result.data.success) setJobAdverts(result.data.data);
      },
      [jobAdvertService]
    ),
    getAllByIsActiveAndCityAndWorkingTimeForList = async (
      cityId,
      workingTimeId,
      pageNumber = 0,
      pageSize = 10
    ) => {
      const result = await jobAdvertService.getAllByIsActiveAndCityAndWorkingTimeForList(
        true,
        cityId,
        workingTimeId,
        pageNumber,
        pageSize
      );
      if (result.data.success) setJobAdverts(result.data.data);
    },
    applyFilter = (values) => {
      getAllByIsActiveAndCityAndWorkingTimeForList(
        values.city.id,
        values.workingTime.id,
        0,
        locationsData.size
      );
      setFilter(values);
    },
    clearFilter = () => {
      getAllByIsActiveForList(0, locationsData.size);
      setFilter(null);
    };

  const changePagination = (pageNumber, pageSize) => {
    if (filter)
      return getAllByIsActiveAndCityAndWorkingTimeForList(
        filter.city.id,
        filter.workingTime.id,
        pageNumber,
        pageSize
      );

    getAllByIsActiveForList(pageNumber, pageSize);
  };

  const [cities, setCities] = useState([]);
  const cityService = useMemo(() => new CityService(), []),
    getAllCities = useCallback(async () => {
      const result = await cityService.getAll();
      if (result.data.data) setCities(result.data.data);
    }, [cityService]);

  const [workingTimes, setWorkingTimes] = useState([]);
  const workingTimeService = useMemo(() => new WorkingTimeService(), []),
    getAllWorkingTimes = useCallback(async () => {
      const result = await workingTimeService.getAll();
      if (result.data.data) setWorkingTimes(result.data.data);
    }, [workingTimeService]);

  const initialValues = {
      city: undefined,
      workingTime: undefined,
    },
    validationSchema = Yup.object().shape({
      city: Yup.object(),
      workingTime: Yup.object(),
    });

  useEffect(() => {
    getAllByIsActiveForList(0, size);
    getAllCities();
    getAllWorkingTimes();
    }, [getAllByIsActiveForList, getAllCities, getAllWorkingTimes, size]);

    useEffect(() => {
      loadEmployeesData();
      loadEmployersData();
      loadLocationsData();
    }, []);
    // console.log(loadEmployersData)

  return (
      <div className='p-4'>
      <div className='text-center mb-3'>
        <h1 className='text-secondary fw-bold'>
          Find Humans
        </h1>
        <div>
          <button
            className='btn btn-secondary'
            data-bs-toggle='offcanvas'
            data-bs-target='#jobAdvertsListFilter'
            aria-controls='jobAdvertsListFilter'
          >
            <i className='bi bi-filter'></i> Filter
          </button>
        </div>
      </div>
      {/* If data is null (still being retrieved) then display the loading spinner */}
      {/* If there exists no data once it's loaded then show "No humans available" */}
      {employeesData === null ? <LoadingSpinner /> : employeesData.length > 0 ? (
        <div className='row justify-content-center'>
        {employeesData.map((item) => (<EmployeeListItem key={item.id} employeeItem={item}/>))}

          {/* Pagination */}
          {pagination && (
            <nav>
              <ul className='pagination justify-content-center'>
                <li className={`page-item ${employeesData.first ? "disabled" : ""}`}>
                  <button
                    className='page-link'
                    onClick={() => changePagination(employeesData.number - 1, employeesData.size)}
                  >
                    Previous
                  </button>
                </li>
                {lodash.times(employeesData.totalPages, (i) => (
                  <li className={`page-item ${employeesData.number === i ? "active" : ""}`}>
                    <button
                      className='page-link'
                      onClick={() => changePagination(i, employeesData.size)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${employeesData.last ? "disabled" : ""}`}>
                  <button
                    className='page-link'
                    onClick={() => changePagination(employeesData.number + 1, employeesData.size)}
                  >
                    Next
                  </button>
                </li>
              </ul>
              <div className='text-center'>
                <select
                  id='pageSizeSelect'
                  className='bg-body border-light'
                  onChange={(e) => getAllByIsActiveForList(0, e.currentTarget.value)}
                >
                  {[10, 20, 50, 100].map((size) => (
                    <option value={size}>{size}</option>
                  ))}
                </select>
              </div>
            </nav>
          )}
        </div>
      ) : (
        <div className='d-flex justify-content-center align-items-center'>
          <i className='bi bi-file-earmark-x text-danger me-2 fs-2' />
          No humans were available.
        </div>
      )}
      <div
        className='offcanvas offcanvas-start'
        tabIndex='-1'
        id='jobAdvertsListFilter'
        aria-labelledby='jobAdvertsListFilter'
      >
        <div className='offcanvas-header'>
          <h1 className='offcanvas-title' id='jobAdvertsListFilter'>
            Filter
          </h1>
          <button
            type='button'
            className='btn-close text-reset'
            data-bs-dismiss='offcanvas'
            aria-label='Close'
          ></button>
        </div>
        <div className='offcanvas-body'>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => applyFilter(values)}
          >
            <Form>
              <FormSelect name='city' options={locationsData.map((c) => ({ value: c.id, label: c.name }))} />
              <FormSelect name='employer' options={employersData.map((wt) => ({ value: wt.id, label: wt.name }))}/>
              <button type='submit' className='btn btn-primary w-100'>
                Filter
              </button>
            </Form>
          </Formik>
          <div className='text-center'>
            <button className='btn btn-light mt-2' onClick={() => clearFilter()}>
              Clear filters
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
