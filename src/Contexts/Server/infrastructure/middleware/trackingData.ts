class TrackingData {
    private static _flowId: string | string[]
    private static _requestId: string
  
    static get FlowId() {
      return TrackingData._flowId
    }
  
    static set FlowId(id: string | string[]) {
      TrackingData._flowId = id
    }
  
    static set RequestId(id: string) {
      TrackingData._requestId = id
    }
  
    static get RequestId() {
      return TrackingData._requestId
    }
  }
  
  export { TrackingData }
  