import client from "../apis/client";
import MockAdapter from "axios-mock-adapter";

const useMock = () => {
  let mock;

  const initMock = () => {
    if (mock) return;
    mock = new MockAdapter(client.axiosInstance, { delayResponse: 1000 });

    mock.onPost("/Mobile/GetCovidTestResults").reply(200,
      [{ id: 1, date: '02/14/2022', result: 'Negative', status: 'Pending' },
      { id: 2, date: '02/07/2022', result: 'Negative', status: 'Approved' },
      { id: 3, date: '01/31/2022', result: 'Negative', status: 'Approved' },
      { id: 4, date: '01/31/2022', result: 'Positive', status: 'Rejected' },
      { id: 5, date: '01/31/2022', result: 'Negative', status: 'Rejected' },
      { id: 6, date: '01/31/2022', result: 'Negative', status: 'Rejected' },
      { id: 7, date: '01/31/2022', result: 'Negative', status: 'Rejected' },
      { id: 8, date: '01/31/2022', result: 'Negative', status: 'Rejected' },
      { id: 9, date: '01/31/2022', result: 'Negative', status: 'Rejected' },
      { id: 10, date: '01/31/2022', result: 'Negative', status: 'Rejected' },
      { id: 11, date: '01/31/2022', result: 'Negative', status: 'Rejected' },
      { id: 12, date: '01/31/2022', result: 'Negative', status: 'Rejected' },
      { id: 13, date: '01/31/2021', result: 'Negative', status: 'Rejected' },
      { id: 14, date: '01/31/2021', result: 'Negative', status: 'Rejected' },
      { id: 15, date: '01/31/2020', result: 'Negative', status: 'Rejected' },
      { id: 16, date: '01/31/2020', result: 'Negative', status: 'Rejected' }]
    );
    mock.onPost("/Mobile/GetCovidTestResultImage").reply(200, {
      base64Image: "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"
    });
    mock.onPost("/Mobile/GetCovidTestResultIntray").replyOnce(200,
      // mock.onPost("/Mobile/GetPendingCovidTestResults").reply(200,
      [{ id: 1, staffName: 'Jacky', staffNo: '61215', date: '02/14/2022', result: 'Positive', status: 'Pending' },
      { id: 2, staffName: 'Kam Man', staffNo: '53643', date: '02/14/2022', result: 'Negative', status: 'Pending' },
      { id: 3, staffName: 'Wee Peng', staffNo: '60630', date: '02/14/2022', result: 'Negative', status: 'Pending' },
      { id: 4, staffName: 'Peter', staffNo: '63860', date: '02/13/2022', result: 'Negative', status: 'Pending' },
      { id: 5, staffName: 'Puvan', staffNo: '64949', date: '02/13/2022', result: 'Negative', status: 'Pending' },
      { id: 6, staffName: 'Aidil', staffNo: '66650', date: '02/12/2022', result: 'Negative', status: 'Pending' },
      ]
    )
      .onPost("/Mobile/GetCovidTestResultIntray").replyOnce(200,
        // mock.onPost("/Mobile/GetCompleteCovidTestResults").reply(200,
        [{ id: 1, staffName: 'Jacky', staffNo: '61215', date: '01/02/2022', result: 'Positive', status: 'Approved' },
        { id: 2, staffName: 'Kam Man', staffNo: '53643', date: '01/02/2022', result: 'Negative', status: 'Rejected' },
        { id: 3, staffName: 'Wee Peng', staffNo: '60630', date: '01/02/2022', result: 'Negative', status: 'Approved' },
        { id: 4, staffName: 'Peter', staffNo: '63860', date: '01/02/2022', result: 'Negative', status: 'Rejected' },
        { id: 5, staffName: 'Puvan', staffNo: '64949', date: '01/02/2022', result: 'Positive', status: 'Approved' },
        { id: 6, staffName: 'Aidil', staffNo: '66650', date: '01/02/2022', result: 'Negative', status: 'Approved' },
        ]);
    mock.onPost("/Mobile/ApproveCovidTest").reply(200, {
      success: true,
      pending: [
        { id: 2, staffName: 'Kam Man', staffNo: '53643', date: '02/14/2022', result: 'Negative', status: 'Pending' },
        { id: 3, staffName: 'Wee Peng', staffNo: '60630', date: '02/14/2022', result: 'Negative', status: 'Pending' },
        { id: 4, staffName: 'Peter', staffNo: '63860', date: '02/14/2022', result: 'Negative', status: 'Pending' },
        { id: 5, staffName: 'Puvan', staffNo: '64949', date: '02/14/2022', result: 'Negative', status: 'Pending' },
        { id: 6, staffName: 'Aidil', staffNo: '66650', date: '02/14/2022', result: 'Negative', status: 'Pending' },
      ],
      completed: [
        { id: 1, staffName: 'Jacky', staffNo: '61215', date: '02/14/2022', result: 'Positive', status: 'Approved' },
        { id: 1, staffName: 'Jacky', staffNo: '61215', date: '01/02/2022', result: 'Negative', status: 'Approved' },
        { id: 2, staffName: 'Kam Man', staffNo: '53643', date: '01/02/2022', result: 'Negative', status: 'Rejected' },
        { id: 3, staffName: 'Wee Peng', staffNo: '60630', date: '01/02/2022', result: 'Negative', status: 'Approved' },
        { id: 4, staffName: 'Peter', staffNo: '63860', date: '01/02/2022', result: 'Negative', status: 'Rejected' },
        { id: 5, staffName: 'Puvan', staffNo: '64949', date: '01/02/2022', result: 'Negative', status: 'Approved' },
        { id: 6, staffName: 'Aidil', staffNo: '66650', date: '01/02/2022', result: 'Negative', status: 'Approved' },
      ]
    });
    mock.onPost("/Mobile/RejectCovidTest").reply(200, {
      success: true,
      pending: [
        { id: 3, staffName: 'Wee Peng', staffNo: '60630', date: '02/14/2022', result: 'Negative', status: 'Pending' },
        { id: 4, staffName: 'Peter', staffNo: '63860', date: '02/14/2022', result: 'Negative', status: 'Pending' },
        { id: 5, staffName: 'Puvan', staffNo: '64949', date: '02/14/2022', result: 'Negative', status: 'Pending' },
        { id: 6, staffName: 'Aidil', staffNo: '66650', date: '02/14/2022', result: 'Negative', status: 'Pending' },
      ],
      completed: [
        { id: 2, staffName: 'Kam Man', staffNo: '53643', date: '02/14/2022', result: 'Negative', status: 'Rejected' },
        { id: 1, staffName: 'Jacky', staffNo: '61215', date: '02/14/2022', result: 'Negative', status: 'Approved' },
        { id: 2, staffName: 'Kam Man', staffNo: '53643', date: '01/02/2022', result: 'Negative', status: 'Rejected' },
        { id: 3, staffName: 'Wee Peng', staffNo: '60630', date: '01/02/2022', result: 'Negative', status: 'Approved' },
        { id: 4, staffName: 'Peter', staffNo: '63860', date: '01/02/2022', result: 'Negative', status: 'Rejected' },
        { id: 5, staffName: 'Puvan', staffNo: '64949', date: '01/02/2022', result: 'Negative', status: 'Approved' },
        { id: 6, staffName: 'Aidil', staffNo: '66650', date: '01/02/2022', result: 'Negative', status: 'Approved' },
      ]
    });
    mock.onGet("/Mobile/LeaveApprover").reply(200, [
      { name: "UAT-34912", selected: "N", personId: "34912" }
      , { name: "UAT-61378", selected: "N", personId: "61378" }
      , { name: "UAT-61384", selected: "Y", personId: "61384" }
      , { name: "UAT-62381", selected: "N", personId: "62381" }
      , { name: "UAT-66020", selected: "N", personId: "66020" }
      , { name: "UAT-7844", selected: "N", personId: "7844" }
    ]);
  };

  return { initMock };
};

export default useMock;