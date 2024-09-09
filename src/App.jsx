import './app.scss'
import * as THREE from 'three';
// 引入轨道控制器 OrbitControls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Line2 } from 'three/examples/jsm/lines/Line2'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { useEffect, useRef, useState } from 'react';
import leftTopImg from './assets/Asset-31.png'
import rightTopImg from './assets/Asset-35.png'
import rightBottomImg from './assets/Asset-34.png'
import leftBottomImg from './assets/Asset-33.png'
import RectangleImg from './assets/Rectangle-3.png'
import yearData from './assets/yearData';
function App () {
  const timeStampRef = useRef()
  const [timeStamp, setTimeStamp] = useState({
    day: '',
    month: '',
    year: '',
    hour: '',
    minute: '',
    seconds: '',
    milliseconds: ''
  })
  const appContainerRef = useRef()
  const boxTopRef = useRef()
  const boxBottomRef = useRef()
  const boxBottomTextRef = useRef()
  const bottomCanvasRef = useRef()
  const bottomSvgRef = useRef()
  const bottomSvgEllipsePathRef = useRef()
  const bottomSvgEllipseTextRef = useRef()
  const semiMajorAxisVal = useRef(0)
  const semiMinorAxisVal = useRef(0)
  const rotate = useRef(0)
  const distanceX = useRef(0)
  const startOffsetObj = useRef({})
  const ellipseIsShow = useRef(true)
  const imgDarken = useRef(false)
  const [contentText, setContentText] = useState([
    {
      title: '2040s: The Age of AI Symbiosis and Global Integration',
      text: 'The 2040s represent a transformative era in artificial intelligence, characterized by deeper integration into every facet of human life, unprecedented advancements in AI capabilities, and significant global cooperation on ethical and regulatory issues. This decade will be defined by the maturation of AI technologies, the evolution of human-AI relationships, and the establishment of global frameworks for managing AI’s societal impact.'
    },
    {
      title: '2040: AI and Human Enhancement – The Era of Augmentation',
      text: 'In 2040, AI-driven technologies significantly advanced human enhancement and augmentation. Brain computer interfaces (BCIs) and neural augmentation devices became commonplace, allowing individuals to enhance cognitive abilities, memory, and sensory perceptions. AI-assisted tools facilitated seamless interaction with augmented reality and virtual environments, leading to new possibilities in education, work, and personal experiences. While these advancements offered tremendous benefits, they also raised questions about privacy, security, and the ethical implications of human enhancement.'
    },
    {
      title: '2041: The Rise of AI in Scientific Discovery – Breakthroughs in Fundamental Research',
      text: 'By 2041, AI had become a crucial partner in scientific discovery, significantly accelerating research in fields such as quantum physics, biotechnology, and space exploration. AI systems were used to analyze complex data sets, simulate experiments, and generate novel hypotheses, leading to groundbreaking discoveries and innovations. This collaboration between AI and human researchers reshaped our understanding of fundamental scientific questions and pushed the boundaries of knowledge.'
    },
    {
      title: '2042: The Global AI Accord – Harmonizing International Standards',
      text: 'In 2042, nations around the world signed the Global AI Accord, a comprehensive agreement designed to harmonize international standards for AI development and deployment. The accord focused on ensuring ethical practices, data protection, and the equitable distribution of AI benefits. It established mechanisms for resolving cross-border disputes and promoting international collaboration on AI research and governance. This agreement marked a significant step toward global cooperation and the responsible management of AI technologies.'
    },
    {
      title: '2043: AI and Autonomous Systems – The Future of Transportation and Logistics',
      text: 'The 2040s saw the widespread adoption of autonomous systems in transportation and logistics. Self-driving vehicles, drones, and automated supply chains revolutionized industries, improving efficiency and reducing operational costs. AI-driven traffic management and smart infrastructure enhanced urban mobility and safety. While these advancements offered significant benefits, they also prompted discussions about the impact on employment, regulatory challenges, and the need for robust safety standards.'
    },
    {
      title: '2044: AI in Governance – The Emergence of AI-Augmented Decision-Making',
      text: 'By 2044, AI systems were integrated into governance and public administration, enhancing decision-making processes and policy development. AI tools provided insights into public opinion, analyzed complex socio-economic data, and optimized resource allocation. The use of AI in governance led to more informed and data-driven decisions, but also raised concerns about transparency, accountability, and the potential for algorithmic biases in public policy.'
    },
    {
      title: '2045: The Evolution of AI Ethics – Rights and Responsibilities',
      text: 'In 2045, discussions about AI ethics and rights continued to evolve as AI systems became more advanced and autonomous. The concept of AI personhood and the ethical treatment of highly intelligent machines became central topics of debate. The development of ethical frameworks and guidelines aimed to address the moral and legal responsibilities associated with advanced AI, balancing innovation with the need for humane and responsible AI practices.'
    },
    {
      title: '2046: AI and Global Health – Addressing Pandemics and Health Crises',
      text: 'In 2046, AI played a critical role in managing global health crises, including pandemics and emerging diseases. Advanced AI models were used for early detection, predictive modeling, and real-time monitoring of health threats. AI-driven systems improved response strategies, vaccine development, and public health interventions. The integration of AI into global health initiatives highlighted its potential to enhance resilience and preparedness for future health challenges.'
    },
    {
      title: '2047: AI in Education – The Rise of Lifelong Learning Platforms',
      text: 'By 2047, AI had transformed education through the proliferation of lifelong learning platforms. These platforms used AI to provide personalized and adaptive learning experiences tailored to individuals’ evolving needs and career goals. Continuous education and re-skilling became integral to professional and personal development, fostering a culture of lifelong learning and adaptability in a rapidly changing world.'
    },
    {
      title: '2048: AI and Environmental Stewardship – Innovations for Sustainability',
      text: 'In 2048, AI technologies were pivotal in advancing environmental stewardship and sustainability efforts. AI systems were used to monitor and manage natural resources, optimize energy use, and address climate change impacts. Innovations in AI-driven environmental monitoring and conservation projects contributed to global efforts to protect ecosystems and promote sustainable practices, reflecting a commitment to addressing environmental challenges.'
    },
    {
      title: '2049: The Future of Human-AI Collaboration – Enhancing Creativity and Productivity',
      text: 'The decade concluded with a focus on enhancing human-AI collaboration to boost creativity and productivity. AI tools were increasingly used to augment human capabilities in various fields, from artistic endeavors to scientific research and business innovation. The symbiotic relationship between humans and AI led to new forms of creative expression, problem-solving, and economic growth, shaping the future of work and innovation.'
    },
    {
      title: 'Conclusion: A Decade of AI Symbiosis and Global Integration',
      text: 'The 2040s were marked by the deep integration of AI into daily life and a heightened focus on global cooperation and ethical considerations. The era saw significant advancements in human-AI augmentation, scientific discovery, and environmental sustainability. As AI technologies continued to evolve and impact various aspects of society, the decade emphasized the importance of responsible development, ethical practices, and international collaboration. The achievements and challenges of the 2040s set the stage for continued progress and reflection as humanity navigated the complexities of a future shaped by advanced AI.'
    }
  ])
  useEffect(() => {
    initRing()
    initYearEllipseBySvg()
    return () => {
      // clearInterval(setIntervalFn)
    }
  }, [])
  const initRing = () => {
    const clientWidth = boxTopRef.current.clientWidth * 1
    const clientHeight = boxTopRef.current.clientHeight * 1
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, clientWidth / clientHeight, 0.1, 1000);
    camera.position.z = 6;
    camera.position.x = 0;
    camera.position.y = -2;
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(clientWidth, clientHeight);
    boxTopRef.current.appendChild(renderer.domElement);
    // 创建圆环几何体
    const geometry = new THREE.RingGeometry(19, 20, 64);
    // 创建材质，可根据需求调整外观
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0
    });
    // 创建圆环网格
    const ring = new THREE.Mesh(geometry, material);
    ring.position.set(0, 19.5, 0)
    scene.add(ring);
    const lineData = []
    // 创建一个空的组来包含所有线条
    for (let i = 0; i < 240; i++) {
      const lineGeometry = new LineGeometry()
      lineGeometry.setPositions([Math.sin(i * (2 * Math.PI / 240)) * 19, Math.cos(i * (2 * Math.PI / 240)) * 19, 0, Math.sin(i * (2 * Math.PI / 240)) * 20, Math.cos(i * (2 * Math.PI / 240)) * 20, 0])
      const lineMaterial = new LineMaterial({ color: 0x000000, linewidth: i % 2 === 0 ? 2 : 1 })
      const line = new Line2(lineGeometry, lineMaterial)
      line.position.set(0, 19.5, 0)
      scene.add(line);
      lineData.push(line);
    }
    // 添加坐标轴辅助对象
    const axesHelper = new THREE.AxesHelper(5);
    axesHelper.position.set(0, 20, 2)
    // scene.add(axesHelper);
    // 记录鼠标按下时的位置和旋转状态
    let mouseDown = false;
    let prevMouse = new THREE.Vector2();
    let cubeRotation = new THREE.Euler();
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    const onMouseDown = (event) => {
      // 将浏览器的2D鼠标位置转换为THREE.js的标准设备坐标(-1到+1)
      mouse.x = (event.clientX / clientWidth) * 2 - 1;
      mouse.y = - (event.clientY / clientHeight) * 2 + 1;
      // 使用鼠标的2D位置和相机进行射线投射
      raycaster.setFromCamera(mouse, camera);
      // 计算物体和射线的交点
      var intersects = raycaster.intersectObjects([ring]);
      // 如果存在交点
      if (intersects.length > 0) {
        // 交点的信息存储在intersects[0]
        console.log('鼠标点击在3D对象上', intersects[0]);
        mouseDown = true;
        prevMouse.x = event.clientX;
        prevMouse.y = event.clientY;
        if (!ellipseIsShow.current) {
          rotateShowEllipse()
        }
      } else {
        console.log('鼠标点击不在3D对象上');
      }
    }
    const onMouseMove = (event) => {
      if (mouseDown) {
        const deltaX = event.clientX - prevMouse.x;
        distanceX.current = deltaX
        const deltaY = event.clientY - prevMouse.y;
        const rotationStep = Math.PI * 2 / 240; // 固定旋转角度
        // 根据鼠标移动的距离计算旋转角度
        const rotationSpeed = 0.002;
        cubeRotation.x += deltaY * rotationSpeed;
        cubeRotation.y += deltaX * rotationSpeed;
        // rotate.current = cubeRotation.y
        rotate.current = Math.round(cubeRotation.y / rotationStep) * rotationStep
        // 更新立方体的旋转
        lineData.forEach((item) => {
          item.rotation.z = rotate.current
        })
        // 共240条刻度线，每6条线Math.PI*2/240*6 弧度
        prevMouse.x = event.clientX;
        prevMouse.y = event.clientY;
        rotateLinkageEllipse()
      }
    }
    const onMouseUp = () => {
      mouseDown = false;
      let rotateNum = (rotate.current / (Math.PI * 2 / 240)).toFixed(0)
      let newRotateVal = 0
      if (Math.abs((rotateNum * 1) % 6) === 0) {
        newRotateVal = rotate.current
      } else if (Math.abs((rotateNum * 1) % 6) >= 3) {
        newRotateVal = rotate.current + (6 - ((rotateNum * 1) % 6)) * (Math.PI * 2 / 240)
      } else {
        newRotateVal = rotate.current + (-((rotateNum * 1) % 6)) * (Math.PI * 2 / 240)
      }
      rotate.current = newRotateVal
      lineData.forEach((item) => {
        item.rotation.z = rotate.current
      })
      rotateLinkageEllipse()
    }
    // 添加鼠标按下事件监听器
    document.addEventListener('mousedown', onMouseDown, false);
    // 添加鼠标移动事件监听器
    document.addEventListener('mousemove', onMouseMove, false);
    // 添加鼠标抬起事件监听器
    document.addEventListener('mouseup', onMouseUp, false);
    function animate () {
      requestAnimationFrame(animate);
      updateDate()
      renderer.render(scene, camera);
    }
    animate();
    window.addEventListener('resize', () => {
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    });
  }
  // svg 绘制椭圆
  const initYearEllipseBySvg = () => {
    const svgCanvas = bottomSvgRef.current;
    const ellipsePath = bottomSvgEllipsePathRef.current;
    const windowWidth = appContainerRef.current.clientWidth
    const windowHeight = appContainerRef.current.clientHeight
    // 椭圆参数
    const semiMajorAxis = (windowWidth * 0.67 / 2) / 1.3
    const semiMinorAxis = semiMajorAxis * 750.39 / 1030
    // const semiMajorAxis = 516 / 1.3 // 椭圆长轴
    // const semiMinorAxis = 375 / 1.3  // 椭圆短轴
    const centerX = svgCanvas.width.animVal.value / 2;  // 椭圆中心X坐标
    const centerY = svgCanvas.height.animVal.value + semiMinorAxis - ((695 - 355) / 695 * windowHeight) + 20;  // 椭圆中心Y坐标 semiMinorAxis-((695-355)/695*windowHeight)
    semiMajorAxisVal.current = semiMajorAxis
    semiMinorAxisVal.current = semiMinorAxis
    // 定义椭圆路径的d属性
    const d = `M${centerX},${centerY} m-${semiMajorAxis},0 a${semiMajorAxis},${semiMinorAxis} 0 1,1 ${2 * semiMajorAxis},0 a${semiMajorAxis},${semiMinorAxis} 0 1,1 -${2 * semiMajorAxis},0`;
    ellipsePath.setAttribute('d', d);
    const textArr = ['1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s', '2030s', '2040s', '2050s']
    const totalSegments = textArr.length;
    const segmentPercentage = 100 / totalSegments; // 每段占路径的百分比
    textArr.forEach((text, index) => {
      // 创建文字元素
      const textElement = bottomSvgEllipseTextRef.current;
      const textPathElement = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
      textPathElement.setAttribute('href', '#ellipsePath');
      textPathElement.setAttribute('id', `textPath_${text}`)
      // 计算每个年代的起始位置，确保等距分布
      const startOffset = `${25 - (2.5 * segmentPercentage) + index * segmentPercentage + segmentPercentage / 2}%`;
      textPathElement.setAttribute('startOffset', startOffset);
      textPathElement.textContent = text;
      textPathElement.setAttribute('fill', '#000000');
      textPathElement.setAttribute('font-family', 'customFont_Roman');
      textPathElement.setAttribute('font-size', '20px');
      textPathElement.setAttribute('text-anchor', 'middle');
      textPathElement.addEventListener('click', function (e) {
        setContentText(yearData[e.target.innerHTML])
        boxBottomTextRef.current.scrollTop = 0
        rotateHideEllipse()
      });
      startOffsetObj.current[`textPath_${text}`] = startOffset
      // 将textPath添加到text中，再将text添加到svg
      textElement.appendChild(textPathElement);
    });
  }
  // 旋转联动椭圆
  const rotateLinkageEllipse = () => {
    // 计算每个年代的起始位置，确保等距分布
    const textArr = ['1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s', '2030s', '2040s', '2050s']
    const totalSegments = textArr.length;
    const segmentPercentage = 100 / totalSegments; // 每段占路径的百分比
    // rotate.current / (Math.PI * 2 / 240) * (segmentPercentage / 6)
    textArr.forEach((text, index) => {
      // 创建文字元素
      const textPathElement = document.getElementById(`textPath_${text}`);
      // 计算每个年代的起始位置，确保等距分布
      // 根据角度偏转角度就是比例
      let rotateProportion = rotate.current / (Math.PI * 2 / 240) * (segmentPercentage / 6)
      let startOffsetVal = 25 - (2.5 * segmentPercentage) + index * segmentPercentage + segmentPercentage / 2 + rotateProportion
      let startOffset = startOffsetVal >= 100 ? startOffsetVal % 100 : startOffsetVal <= 0 ? startOffsetVal % 100 + 100 : startOffsetVal
      textPathElement.setAttribute('startOffset', `${startOffset}%`);
      startOffsetObj.current[`textPath_${text}`] = startOffset
    });
  }
  // 旋转隐藏椭圆
  const rotateHideEllipse = () => {
    const windowWidth = appContainerRef.current.clientWidth
    const windowHeight = appContainerRef.current.clientHeight
    const svgCanvas = bottomSvgRef.current;
    const ellipsePath = bottomSvgEllipsePathRef.current;
    const semiMajorAxis = semiMajorAxisVal.current
    const semiMinorAxis = semiMinorAxisVal.current
    const centerX = svgCanvas.width.animVal.value / 2;  // 椭圆中心X坐标
    const centerY = svgCanvas.height.animVal.value + semiMinorAxis - ((695 - 355) / 695 * windowHeight) + 20;  // 椭圆中心Y坐标 semiMinorAxis-((695-355)/695*windowHeight)
    let i = 0
    const interval = 1000 / 120;
    imgDarken.current = true;
    const setIntervalFn1 = setInterval(() => {
      i++;
      let newSemiMajorAxis = semiMajorAxis
      let newSemiMinorAxis = semiMinorAxis
      const d = `M${centerX},${centerY} m-${newSemiMajorAxis},0 a${newSemiMajorAxis},${newSemiMinorAxis} 0 1,1 ${2 * newSemiMajorAxis},0 a${newSemiMajorAxis},${newSemiMinorAxis} 0 1,1 -${2 * newSemiMajorAxis},0`;
      ellipsePath.setAttribute('d', d);
      // 计算每个年代的起始位置，确保等距分布
      const textArr = ['1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s', '2030s', '2040s', '2050s']
      const totalSegments = textArr.length;
      const segmentPercentage = 100 / totalSegments; // 每段占路径的百分比
      textArr.forEach((text, index) => {
        // 创建文字元素
        const textPathElement = document.getElementById(`textPath_${text}`);
        // 计算每个年代的起始位置，确保等距分布
        // 根据角度偏转角度就是比例
        let rotateProportion = (rotate.current / (Math.PI * 2) + i * (Math.PI * 2 / 50)) * 100
        let startOffsetVal = 25 - (2.5 * segmentPercentage) + index * segmentPercentage + segmentPercentage / 2 + rotateProportion
        let startOffset = startOffsetVal >= 100 ? startOffsetVal % 100 : startOffsetVal <= 0 ? startOffsetVal % 100 + 100 : startOffsetVal
        textPathElement.setAttribute('startOffset', `${startOffset}%`);
        textPathElement.setAttribute('fill', `rgba(0,0,0,${1 - i * 1 / 50})`);
      });
      if (i >= 50) {
        ellipseIsShow.current = false
        clearInterval(setIntervalFn1)
      }
    }, interval);
  }
  // 旋转展示椭圆
  const rotateShowEllipse = () => {
    const windowWidth = appContainerRef.current.clientWidth
    const windowHeight = appContainerRef.current.clientHeight
    const svgCanvas = bottomSvgRef.current;
    const ellipsePath = bottomSvgEllipsePathRef.current;
    const semiMajorAxis = semiMajorAxisVal.current
    const semiMinorAxis = semiMinorAxisVal.current
    const centerX = svgCanvas.width.animVal.value / 2;  // 椭圆中心X坐标
    const centerY = svgCanvas.height.animVal.value + semiMinorAxis - ((695 - 355) / 695 * windowHeight) + 20;  // 椭圆中心Y坐标 semiMinorAxis-((695-355)/695*windowHeight)
    let i = 0
    ellipseIsShow.current = true;
    imgDarken.current = false;
    setTimeout(() => {
      const interval = 1000 / 120;
      const setIntervalFn = setInterval(() => {
        i++;
        let newSemiMajorAxis = semiMajorAxis
        let newSemiMinorAxis = semiMinorAxis
        const d = `M${centerX},${centerY} m-${newSemiMajorAxis},0 a${newSemiMajorAxis},${newSemiMinorAxis} 0 1,1 ${2 * newSemiMajorAxis},0 a${newSemiMajorAxis},${newSemiMinorAxis} 0 1,1 -${2 * newSemiMajorAxis},0`;
        ellipsePath.setAttribute('d', d);
        // 计算每个年代的起始位置，确保等距分布
        const textArr = ['1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s', '2030s', '2040s', '2050s']
        const totalSegments = textArr.length;
        const segmentPercentage = 100 / totalSegments; // 每段占路径的百分比
        textArr.forEach((text, index) => {
          // 创建文字元素
          const textPathElement = document.getElementById(`textPath_${text}`);
          // 计算每个年代的起始位置，确保等距分布
          // 根据角度偏转角度就是比例
          let rotateProportion = (rotate.current / (Math.PI * 2) + i * 0.018) * 100
          let startOffsetVal = index * segmentPercentage + segmentPercentage / 2 - rotateProportion
          let startOffset = startOffsetVal >= 100 ? startOffsetVal % 100 : startOffsetVal <= 0 ? startOffsetVal % 100 + 100 : startOffsetVal
          textPathElement.setAttribute('startOffset', `${startOffset}%`);
          textPathElement.setAttribute('fill', `rgba(0,0,0,${i * 1 / 50})`);
          // textPathElement.setAttribute('font-size', `19-${i * 19 / 100}px`);
          textPathElement.setAttribute('font-size', `19px`);
        });
        if (i >= 50) {
          textArr.forEach((text, index) => {
            // 创建文字元素
            const textPathElement = document.getElementById(`textPath_${text}`);
            textPathElement.setAttribute('startOffset', `${startOffsetObj.current[`textPath_${text}`]}%`);
          });
          clearInterval(setIntervalFn)
        }
      }, interval);
    }, 1000)
  }
  const updateDate = () => {
    const newDate = new Date()
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1; // 月份从 0 开始，需加 1
    const year = newDate.getFullYear();
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    const seconds = newDate.getSeconds();
    const milliseconds = newDate.getMilliseconds();

    // 格式化为双位数字（如 01, 02 等）
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMilliseconds = milliseconds.toString().padStart(3, '0'); // 毫秒为三位数字
    // const formattedMilliseconds = ''; // 毫秒为三位数字
    // 拼接日期和时间字符串
    // const formattedTime = `${formattedDay} ${formattedMonth} ${year} ${formattedHours} ${formattedMinutes} ${formattedSeconds} ${formattedMilliseconds}`;
    const formattedTime = `${formattedDay} ${formattedMonth} ${year} ${formattedHours} ${formattedMinutes}`;
    setTimeStamp({
      day: formattedDay,
      month: formattedMonth,
      year,
      hour: formattedHours,
      minute: formattedMinutes,
      seconds: formattedSeconds,
      milliseconds: formattedMilliseconds
    })
    timeStampRef.current.textContent = formattedTime
  }
  return (
    <>
      <div className='appContainer' ref={appContainerRef}>
        <div className='mask'></div>
        {/* <div className='bgImg'></div> */}
        {/* <div className='line'></div> */}
        <div className={imgDarken.current ? 'leftTopImg isDarken' : 'leftTopImg'}>
          <img src={leftTopImg} alt="" />
        </div>
        <div className={imgDarken.current ? 'rightTopImg isDarken' : 'rightTopImg'}>
          <img src={rightTopImg} alt="" />
        </div>
        <div className={imgDarken.current ? 'rightBottomImg isDarken' : 'rightBottomImg'}>
          <img src={rightBottomImg} alt="" />
        </div>
        <div className={imgDarken.current ? 'leftBottomImg isDarken' : 'leftBottomImg'}>
          <img src={leftBottomImg} alt="" />
        </div>
        <div className='timeStamp'>
          {/* <div className='timeStamp_day'>{timeStamp.day}</div>
          <div className='timeStamp_month'>{timeStamp.month}</div>
          <div className='timeStamp_year'>{timeStamp.year}</div>
          <div className='timeStamp_hour'>{timeStamp.hour}</div>
          <div className='timeStamp_minute'>{timeStamp.minute}</div>
          <div className='timeStamp_seconds'>{timeStamp.seconds}</div>
          <div className='timeStamp_milliseconds'>{timeStamp.milliseconds}</div> */}
          <div className='timeLeft' ref={timeStampRef}></div>
          &nbsp;
          <div className='timeStamp_seconds'>{timeStamp.seconds}</div>
          &nbsp;
          <div className='timeStamp_milliseconds'>{timeStamp.milliseconds}</div>
        </div>
        <div className='boxTop' ref={boxTopRef}></div>
        <div className='boxBottom' ref={boxBottomRef}>
          <canvas className='boxBottomCanvas' ref={bottomCanvasRef} width="0" height="0"></canvas>
          <svg width="100%" height="100%" ref={bottomSvgRef} className={ellipseIsShow.current ? 'boxBottomCanvasSvg' : 'boxBottomCanvasSvg boxBottomCanvasSvg_hide'}>
            {/* 可以在<defs>中定义各种图形元素，如<path>、<circle>、<rect>等，这些定义的元素本身不会直接显示在 SVG 图像中，而是作为模板供其他元素引用。 */}
            <defs>
              <path id="ellipsePath" ref={bottomSvgEllipsePathRef} d="" />
            </defs>
            {/* 用<g> 包裹文本，并对文本进行拉伸 */}
            {/* 横向拉伸文本，椭圆保持不变 */}
            <g id='ellipseG'>
              <text id="ellipseText" ref={bottomSvgEllipseTextRef} ></text>
            </g>
          </svg>
          <div className={ellipseIsShow.current ? 'boxBottomText boxBottomText_hide' : 'boxBottomText'} ref={boxBottomTextRef}>
            {contentText.map((item) => (
              <>
                <div className='textItem' key={item.title}>
                  <div className='title'>{item.title}</div>
                  <div className='text'>{item.text}</div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div >
    </>
  )
}

export default App
