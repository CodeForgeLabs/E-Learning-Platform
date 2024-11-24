"use client"
import React , {useState} from 'react'
import useTags from './hooks/useTags';
import { TagField } from './TagField';

const NewTopic = () => {
    const MAX_TAGS = 5;
    const { tags, handleAddTag, handleRemoveTag } = useTags(MAX_TAGS);

    const [selectedOption, setSelectedOption] = useState("Question");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div className='flex flex-col justify-center max-pc:border-b-[1px] max-pc:border-t-[1px]  pc:border-[1px] pc:mx-10 my-10 py-5  pc:w-[60%] max-pc:w-full px-5'>
      <h1 className='text-3xl  font-extrabold'>Create new topic</h1>
      <p className='font-extralight'>ask a question or share your idea</p>
      <p className='mt-4 font-medium'>what kind of topic are you creating? </p>

            <div className='flex w-full flex-wrap gap-3 mt-4'>


                    
                        <label data-tip = "When you need of a solution for your question or problem" className={`tooltip  flex flex-nowrap border-[1px] pc:gap-28 max-pc:w-full px-2 label cursor-pointer ${selectedOption == "Question" ? "border-secondary":" border-neutral"} `}>
                    <span className={`label-text ${selectedOption == "Question" ? "text-secondary":""}`}> Questions</span>
                    <input type="radio" name="radio-10" className="radio radio-sm checked:bg-secondary" value ="Question" checked={selectedOption === "Question"}
            onChange={handleOptionChange}/>
                    </label>
                
                    
                    <label data-tip = "When you want to share something and involve the community into a discussion " className={` tooltip  flex flex-nowrap  pc:gap-44 max-pc:w-full px-2 label border-[1px] cursor-pointer ${selectedOption == "Idea" ? "border-secondary":"border-neutral"} `}>
                        <span className={`label-text ${selectedOption == "Idea" ? "text-secondary":""}`}>Idea</span>
                        <input type="radio" name="radio-10" className="radio radio-sm checked:bg-secondary"value = "Idea" checked={selectedOption === "Idea"}
            onChange={handleOptionChange} />
                    </label>
                    

                </div>
        <p className='mt-4 font-medium'>Title</p>       
        <input placeholder='Enter title here' className=' focus:border-secondary bg-base-300 border-[1px] border-opacity-30 border-base-300 rounded-md h-10 p-2 mt-4 outline-none'></input> 
        <p className='mt-4 font-medium'>Description</p>
        <textarea  
  onInput={(e) => {
    (e.target as HTMLTextAreaElement).style.height = "auto"; // Reset height to calculate new height
    (e.target as HTMLTextAreaElement).style.height = `${(e.target as HTMLTextAreaElement).scrollHeight}px`; // Set height based on content
  }}className="textarea overflow-hidden border border-neutral  mt-4 min-h-36 " placeholder="Please provide as much detail as possible to ensure your ideas and questions are clearly communicated."></textarea>
        <p className='mt-4 font-medium'>Tags</p>

        <TagField
          tags={tags}
          addTag={handleAddTag}
          removeTag={handleRemoveTag}
          maxTags={MAX_TAGS}
        />

        <button className='btn mt-5'>Create</button>

        
    </div>
  )
}

export default NewTopic
