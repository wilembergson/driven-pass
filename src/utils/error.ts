export default function Error(status:number, message: string){
    throw {status, message}
}