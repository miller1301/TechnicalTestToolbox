import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button'
import axios from 'axios';

function FileTable() {
    const uriApi = 'http://localhost:3000';
    const [files, setFiles] = useState([]);
    const [listFiles, setlistFiles] = useState([]);

    useEffect(() => {
        axios.get(`${uriApi}/files/data`)
            .then(response => {
                setFiles(response.data);
            })
            .catch(error => {
                console.error('Error fetching files:', error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${uriApi}/files/list`)
            .then(response => {
                setlistFiles(response.data.files);
            })
            .catch(error => {
                console.error('Error fetching list:', error);
            });
    }, []);

    const handleFileClick = (file) => {
        axios.get(`${uriApi}/files/data?fileName=${file}`)
            .then(response => {
                setFiles(response.data);
            })
            .catch(error => {
                console.error('Error fetching files:', error);
            });
    };

    const handleClearClick = () => {
        axios.get(`${uriApi}/files/data`)
            .then(response => {
                setFiles(response.data);
            })
            .catch(error => {
                console.error('Error fetching files:', error);
            });
    };

    return (
        <div>
            <div className='bg-danger text-white text-start p-1 ps-3'>
                <h1 className='h3'>Test File</h1>
            </div>

            <div className='d-flex justify-content-end align-items-center'>
                <Button className='h-25' variant="danger" onClick={handleClearClick}>Limpiar</Button>{' '}

                <DropdownButton className='text-end m-3' id="dropdown-basic-button" title="Filtrar archivo">
                    {listFiles.map(file => (
                        <Dropdown.Item key={file} onClick={() => handleFileClick(file)}>{file}</Dropdown.Item>
                    ))}
                </DropdownButton>
            </div>

            <Table striped bordered hover className='text-start'>
                <thead className='border border-dark'>
                    <tr>
                        <th>File Name</th>
                        <th>Text</th>
                        <th>Number</th>
                        <th>Hex</th>
                    </tr>
                </thead>
                <tbody>
                    {files.length > 0 ? (
                        files.map(file => (
                            file.lines.map((line, index) => (
                                <tr key={`${file.file}-${index}`}>
                                    <td>{file.file}</td>
                                    <td>{line.text}</td>
                                    <td>{line.number}</td>
                                    <td>{line.hex}</td>
                                </tr>
                            ))
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No hay líneas para mostrar</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default FileTable;
