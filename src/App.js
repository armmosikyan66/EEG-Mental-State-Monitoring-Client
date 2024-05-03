import React, {Suspense, useEffect, useRef} from 'react';
import "./App.css";
import {useDispatch, useSelector} from "react-redux";
import {setScene} from "./store/slices/scene";

const Spline = React.lazy(() => import('@splinetool/react-spline'));

export default function App() {
    const inputRef = useRef(null);
    const scene = useSelector(state => state.scene.value);
    const dispatch = useDispatch()
    console.log(scene, "-------")
    useEffect(() => {
        if (scene === "concentration") {
            return
        }

        const relaxationWs = new WebSocket("ws://localhost:8080/api/v1/relaxation");

        relaxationWs.onopen = () => {
            console.log('WebSocket connection established');
        };

        relaxationWs.onmessage = (event) => {
            if (event.data === "process") return
            const res = JSON.parse(event.data)

            if (res.type === "score") {
                return
            }

            switch (res.current_step) {
                case 1:
                    simulateKeydown("a")
                    break
                case 2:
                    simulateKeydown("s")
                    break
                case 3:
                    simulateKeydown("d")

                    setTimeout(() => {
                        simulateKeydown("f")
                        dispatch(setScene("concentration"))
                    }, 5000)
                    break
                default:
                    break
            }
        };

        return () => {
            relaxationWs.close();
        };
    }, [scene]); // Including currentStep and prevStep as dependencies

    useEffect(() => {
        if (scene === "relaxation") {
            return
        }

        const concentrationWs = new WebSocket("ws://localhost:8080/api/v1/concentration");

        concentrationWs.onopen = () => {
            console.log('WebSocket connection established');
        };

        concentrationWs.onmessage = (event) => {
            if (event.data === "process") return
            const res = JSON.parse(event.data)

            if (res.type === "score") {
                return
            }

            switch (res.current_step) {
                case 1:
                    simulateKeydown("a")
                    break
                case 2:
                    simulateKeydown("s")
                    break
                case 3:
                    simulateKeydown("d")
                    break
                default:
                    break
            }
        };

        return () => {
            concentrationWs.close();
        };
    }, [scene]); // Including currentStep and prevStep as dependencies

    const simulateKeydown = (key) => {
        const keyData = {
            'a': {code: 'KeyA', keyCode: 65, charCode: 97},
            's': {code: 'KeyS', keyCode: 83, charCode: 115},
            'd': {code: 'KeyD', keyCode: 68, charCode: 100},
            'f': {code: 'KeyF', keyCode: 70, charCode: 66},
        };

        if (inputRef.current && keyData[key]) {
            const event = new KeyboardEvent('keydown', {
                key: key,
                code: keyData[key].code,
                keyCode: keyData[key].keyCode,
                charCode: keyData[key].charCode,
                bubbles: true
            });
            inputRef.current.dispatchEvent(event);
        }
    };

    return (
        <Suspense fallback={<>Loading...</>}>
            <div ref={inputRef} className="scene">
                <Spline scene="https://prod.spline.design/ZXed7aNSTE9gv2-c/scene.splinecode"/>
            </div>
        </Suspense>
    );
}
