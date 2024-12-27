import React from 'react'

function Loading() {
  return (
    <div style={{textAlign:'center'}}>
        <div className="spinner-border" role="status" style={{height:'100px',width:'100px',margintop:'100px', paddingLeft:'30px'}}>
  <span className="visually-hidden">Loading...</span>
</div>
    </div>
  )
}

export default Loading