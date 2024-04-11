import styled from 'styled-components'
import { data } from './gang.json'

export default function Gang() {
  // 번호, 일자, 구분, 항목, 수입, 지출, 총액, 비고, 증빙
  return (
    <Wrap>
      <Title>2024 학급회 조직도</Title>
      <Inform>Ctrl+F로 이름을 검색하면 역할을 찾기 쉽습니다.</Inform>
      <TableWrap>
        {data.map(v => (
          <MemberBox>
            <Department>{v.department}</Department>
              <StudentTable>
                <HeadTr>
                  <td>이름</td>
                  <td>직책</td>
                  <td>역할</td>
                </HeadTr>
                {v.members.map(member => (
                  <Student>
                    <Name>{member.name}</Name>
                    <Role>{member.role}</Role>
                    <Desc>{member.desc}</Desc>
                  </Student>
                ))}
              </StudentTable>
          </MemberBox>
        ))}
      </TableWrap>
    </Wrap>
  )
}

const Wrap = styled.div`
  overflow: auto;
`

const TableWrap = styled.div`
  overflow: auto;
`

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
`

const Inform = styled.div`
  margin-top: 1rem;
  text-align: center;
  font-size: 0.8rem;
  color: #aaa;
`

const MemberBox = styled.div`
  margin-block: 1.5rem;
  border-collapse: collapse;
  padding: 1rem;
  width: 25rem;
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 20px;
`

const Department = styled.div` // 부서 이름
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #ee1183;
  margin-bottom: 0.5rem;
`

const StudentTable = styled.table`
  width: 100%;
  & td {
    width: 33.3%;
    text-align: center;
    /* font-weight: 600; */
  }
`

const HeadTr = styled.tr`
  color: #8b8b8b;
  font-size: 0.9rem;
  height: 2rem;
`

const Student = styled.tr` // 학생 한 명 감싸는 태그
  gap: 0.3rem;
  margin-block: 0.2rem;
  height: 1.6rem;
`

const Name = styled.td` // Student 자식1 : 학생 이름
  font-weight: 600;
`

const Role = styled.td` // Student 자식2 : 직책
  
`

const Desc = styled.td` // Student 자식3 : 역할
  font-size: 0.9rem;
`