"use client"


import React, { useContext, useEffect, useRef, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { CiStar, CiHeart } from "react-icons/ci";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/app/_config/confg';
import { FaStar } from "react-icons/fa";
import { Contex } from '@/app/preview/[preview_id]/page';
import { FaHeart } from "react-icons/fa6";


function Rate_pre(props: { kind: string, id: string, name: string, isrequired: boolean } | any) {
    let [kind, setKind] = useState("star")
    let [count, setCount] = useState(5);
    let [checked, setCheck] = useState(false)





    // for rates




    let [value, setValue2] = useState("")

    useEffect(() => {
        const getDa = async () => {
            let questions: any = (await getDoc(doc(db, "forms", `${props.name}`))).data()
            let filter1 = questions.contentQuestion.filter((e: { id: string }) => e.id === props.id);
            setCheck(filter1[0].isrequired)
            setKind(filter1[0].rate_kind)
            setCount(filter1[0].rate_count)
            setValue2(filter1[0].Title)
        }

            getDa()
        
    }, [])
    let [co, setCo] = useState(0)
    let [active, setActive] = useState(false)

    const { valuee, setValue }: any = useContext(Contex);

    console.log()
    return (
        <>
            <div className="rate  py-[20px] border-t-[1px] border-t-[#ddd]">
                <div className="edit_title_quetion flex justify-between px-[15px]">
                    <h2 className='text-[25px] font-[600] w-full'>{value} {checked ? (<span className='text-red-500'>*</span>) : null}</h2>
                </div>
                <div className="stars">
                    {kind === "star" ? (
                        <div className="stars flex text-[40px] pl-[15px] my-[20px] cursor-pointer">
                            {Array.from(Array(co), (e, i) => (
                                <div className="star" onClick={() => {
                                    console.log(i)
                                    setCo(i + 1)
                                    setActive(false)
                                    let arr = [...valuee]
                                    arr.push(
                                        {
                                            kind: "rate",
                                            solution: i + 1,
                                            id: props.id,
                                            NameQuestion: value,
                                            isrequired: checked,
                                        }
                                    )
                                    setValue(arr)
                                }}>
                                    <FaStar color='rgb(245 158 11 / 1)' />
                                </div>
                            ))}
                            {Array.from(Array(count - co), (e, i) => (
                                <div className="star" data-count={i + 1} onClick={() => {
                                    console.log(i)
                                    setCo(i + 1)
                                    setActive(true)
                                    let arr = [...valuee]
                                    arr.push(
                                        {
                                            kind: "rate",
                                            solution: i + 1,
                                            id_Question: props.id,
                                            NameQuestion: value,
                                            isrequired: checked,
                                        }
                                    )
                                    setValue(arr)
                                }}>
                                    <CiStar color="black" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="heart flex text-[40px] pl-[15px] my-[20px] cursor-pointer">
                            {Array.from(Array(co), (e, i) => (
                                <div className="star" onClick={() => {
                                    console.log(i)
                                    setCo(i + 1)
                                    setActive(false)
                                    let arr = [...valuee]
                                    arr.push(
                                        {
                                            kind: "heart",
                                            solution: i + 1,
                                            id: props.id,
                                            NameQuestion: value,
                                            isrequired: checked,
                                        }
                                    )
                                    setValue(arr)
                                }}>
                                    <FaHeart color='#E82561' />
                                </div>
                            ))}
                            {Array.from(Array(count - co), (e, i) => (
                                <div className="star" data-count={i + 1} onClick={() => {
                                    console.log(i)
                                    setCo(i + 1)
                                    setActive(true)
                                    let arr = [...valuee]
                                    arr.push(
                                        {
                                            kind: "heart",
                                            solution: i + 1,
                                            id_Question: props.id,
                                            NameQuestion: value,
                                            isrequired: checked,
                                        }
                                    )
                                    setValue(arr)
                                }}>
                                    <CiHeart />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

        </>
    )
}

export default Rate_pre
