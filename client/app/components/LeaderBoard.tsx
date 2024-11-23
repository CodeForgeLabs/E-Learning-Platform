import React from 'react'
import Image from 'next/image'

const LeaderBoard = () => {
  return (
    
    
    <div className='  flex flex-col my-10   h-fit'>
      
    <div className=' py-9 bg-secondary rounded-xl '>
        <h1 className='text-2xl text-center text-base-300'>Top Discussion Leaderboard</h1>
    
    </div>

    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        
        <th>Name</th>
        <th>speciality</th>
        <th>points</th>
        
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <Image
                  width={100}
                  height={100}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwW4kzIb_8SII6G7Bl4BCPfRmLZVVtc2kW6g&s"
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Natnael Biruk</div>
              <div className="text-sm opacity-50">Eth</div>
            </div>
          </div>
        </td>
        <td>
      
          <span className="text-xs">Project manager</span>
        </td>

        <td>1000</td>
        
        
      </tr>
      {/* row 2 */}
      <tr>
        
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <Image
                width={100}
                height={100}
                  src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Yenus</div>
              <div className="text-sm opacity-50">Eth</div>
            </div>
          </div>
        </td>
        <td>

          <span className="tsxt-xs ">intern</span>
        </td>
        <td>900</td>
        
      </tr>
      {/* row 3 */}
      <tr>
        
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <Image
                width={100}
                height={100}
                  src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Fish</div>
              <div className="text-sm opacity-50">Eth</div>
            </div>
          </div>
        </td>
        <td>

          <span className="tsxt-xs ">intern II</span>
        </td>
        <td>
            800
        </td>
      </tr>
      {/* row 4 */}
      <tr>
        
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <Image
                width={100}
                height={100}
                  src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Yancy Tear</div>
              <div className="text-sm opacity-50">Brazil</div>
            </div>
          </div>
        </td>
        <td>

          <span className="tsxt-xs ">Community</span>
        </td>

        <td>700</td>
        
      </tr>
    </tbody>
    {/* foot */}
   
  </table>
</div>
    


</div>
  )
}

export default LeaderBoard
