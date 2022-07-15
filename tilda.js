async function getData(){
  const f_id = document.getElementById('f_id').value;
  const data = await getRawData(f_id);
  const resp = document.getElementById('resp');
  const respDiv = createRespDiv(data);
  resp.innerHTML='';
  resp.appendChild(respDiv);
}

function createRespDiv(data){
  const respDiv = document.createElement('div');
  if (data!=null){
    respDiv.className='ok';
    const respCol1 = document.createElement('div');
    const respCol2 = document.createElement('div');
    const respCol3 = document.createElement('div');
    respCol1.innerText='id_1';
    respCol2.innerText='id_2';
    respCol3.innerText='status';
    respDiv.appendChild(respCol1);
    respDiv.appendChild(respCol2);
    respDiv.appendChild(respCol3);
    data.forEach((el) => {
      el.c.forEach((el2)=>{
        const respVal = document.createElement('div');
        respVal.innerText=el2.v;
        respDiv.appendChild(respVal);
      })
    });
  } else {
    respDiv.innerHTML='Not found';
    respDiv.className='not_found';

  }
  return respDiv;
}

async function getRawData(id){
  const sheetId = '159A-oxBIuFaN376evbiGgOHQbw_0OeOYAVXS8mOQJwA';
  const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
  const sheetName = 'user-data';
  const query = encodeURIComponent(`Select A,B,C where A=${id}`);
  const url = `${base}&sheet=${sheetName}&tq=${query}`;
  const res1 = await fetch(url);
  const res2 = await res1.text();
  const res3 = await JSON.parse(res2.substring(47).slice(0, -2));
  if (res3.status!='error' && res3.table.rows.length!=0){
    return res3.table.rows;
  } else return null;
}

document.getElementById('searchBtn').addEventListener("click", ()=>{getData();})