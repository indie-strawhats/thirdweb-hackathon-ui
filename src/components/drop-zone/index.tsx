import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { useDropzone } from 'react-dropzone';

const DropZone = (props: any) => {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  useEffect(() => {
    if (!acceptedFiles.length) return;
    (async () => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => setUploadedFiles([event.target?.result]);
    })();
  }, [acceptedFiles]);

  const mintNewSword = async () => {
    const fileData = acceptedFiles[0];

    const response = await fetch('/api/mint', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        account: props.account,
        fileData: uploadedFiles[0],
      }),
    });
  };

  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div>
        <div>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
          </div>
          <aside>
            <h4>Files</h4>
            <ul>{files}</ul>
          </aside>
        </div>
        <div>
          <button onClick={mintNewSword}>Mint</button>
        </div>
      </div>
    </section>
  );
};

export default DropZone;
