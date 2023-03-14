import React, { useState } from "react";
import { Form } from "react-router-dom";
import * as xlsx from "xlsx";
import axios from "axios";
import dateFormat from "dateformat";

function Pengumuman() {
	const [excelFile, setExcelFile] = useState(null);

	const [excelData, setExcelData] = useState(null);
	const [excelFileError, setExcelError] = useState(null);

	const sendData = async function (data) {
		try {
			const list = await axios.post(
				`http://localhost:5000/pengumuman/create`,
				{
					isi_pengumuman: data.pengumuman,
					publish_data: dateFormat(new Date(data.date), "yyyy-mm-dd HH:MM:ss"),
				},
				{ headers: { "content-type": "application/json" } }
			);

			const data2 = list.data;
			console.log(data2);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = function (e) {
		e.preventDefault();
		if (excelFile !== null) {
			const workbook = xlsx.read(excelFile, { type: "buffer" });
			const worksheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[worksheetName];
			const data = xlsx.utils.sheet_to_json(worksheet);
			setExcelData(data);

			data.forEach((item) => {
				sendData(item);
			});

			console.log(worksheetName);
			console.log(worksheet);
			console.log(excelData);
		} else {
			setExcelData(null);
		}
	};

	const fileType = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];

	const handleChange = function (e) {
		let selectedFile = e.target.files[0];
		console.log("coba", e.target.files);
		if (selectedFile) {
			console.log(selectedFile.type);
			if (selectedFile && fileType.includes(selectedFile.type)) {
				let reader = new FileReader();
				reader.readAsArrayBuffer(selectedFile);
				reader.onload = (e) => {
					setExcelError(null);
					setExcelFile(e.target.result);
				};
			}
		} else {
			setExcelError("Tolong upload file excel saja");
			setExcelFile(null);
		}
	};

	return (
		<div>
			<h2>Pengumuman</h2>
			<p>Silahkan upload file excel yang berisi 2 column, tanggal dan isi pengumuman.</p>
			<Form method="post" onSubmit={handleSubmit}>
				<input type="file" id="myFile" name="filename" onChange={handleChange} />
				<input type="submit" />
			</Form>
		</div>
	);
}

export default Pengumuman;
