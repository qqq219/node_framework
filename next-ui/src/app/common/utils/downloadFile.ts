export function downloadFile(response: any, filename: string) {
  console.log('response', response);
  //ts-ignore
  const url = window.URL.createObjectURL(new Blob([response.data as unknown as BlobPart]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename); // 替换为你想要的文件名和扩展名
  document.body.appendChild(link);
  link.click();
  link.remove();
}