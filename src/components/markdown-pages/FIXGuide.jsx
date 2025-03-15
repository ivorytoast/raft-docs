import { useState } from 'react'
import FIXMessageBreakdown from '../components/FIXMessageBreakdown'
import FIXFieldReference from '../components/FIXFieldReference'
import FIXMessageTemplate from '../components/FIXMessageTemplate'

function FIXGuide() {
  return (
    <div className="space-y-8">
      {/* Message Breakdown Example */}
      <FIXMessageBreakdown 
        message="8=FIX.4.2\u00019=145\u000135=D\u000134=4\u000149=ARCA\u000152=20230615-14:47:55.250\u000156=FIRM\u000111=ORDERID12\u000121=1\u000155=MSFT\u000154=1\u000138=100\u000140=2\u000159=0\u000144=12.50\u000147=A\u000160=20230615-14:47:55.250\u000110=089\u0001"
      />

      {/* Field Reference Example */}
      <FIXFieldReference
        tag="35"
        name="MsgType"
        description="Defines message type"
        required={true}
        validValues={[
          { value: 'D', meaning: 'New Order Single' },
          { value: '8', meaning: 'Execution Report' },
        ]}
      />

      {/* Message Template Example */}
      <FIXMessageTemplate
        messageType="New Order Single (D)"
        description="Used to submit a new order"
        fields={[
          { tag: '11', name: 'ClOrdID', required: true, description: 'Unique order identifier' },
          { tag: '55', name: 'Symbol', required: true, description: 'Ticker symbol' },
          { tag: '54', name: 'Side', required: true, description: 'Order side (Buy/Sell)' },
        ]}
      />
    </div>
  )
}

export default FIXGuide 