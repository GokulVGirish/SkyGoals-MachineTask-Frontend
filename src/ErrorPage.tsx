const ErrorPage=({message}:{message:string|null})=>{
 return (
   <div className="flex items-center justify-center min-h-screen bg-black text-white">
     <div className="text-center">
       <h1 className="text-6xl font-bold text-red-500">Oops!</h1>
       <p className="mt-4 text-xl text-gray-300">Something went wrong.</p>
       {message && (
         <p className="mt-2 text-sm text-gray-500">Error: {message}</p>
       )}
       <button
         onClick={() => window.location.reload()}
         className="mt-6 px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
       >
         Reload Page
       </button>
     </div>
   </div>
 );
}
export default ErrorPage