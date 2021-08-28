import { gql } from "@apollo/client";

export const GET_STUDENTS = gql`
query{
    students{
      _id
      name
      email
      phone
      dob
    }
  }`;

export const GET_SUBJECTS = gql`
query{
    subjects{
      _id
      name
    }
  }`;

export const ADD_STUDENT = gql`
  mutation addStudent(
      $name: String!,
      $email: String!,
      $phone: String!,
      $dob: String!) {
          addStudent(
              name: $name,
              email: $email,
              phone: $phone,
              dob: $dob) {
                  _id
        }
    }
`;

export const ADD_SUBJECT = gql`
  mutation addSubject(
      $name: String!){
          addSubject(
              name: $name){ 
                  _id
        }
    }
`;

export const DELETE_STUDENT = gql`
  mutation deleteStudent(
      $id: ID!){
          deleteStudent(
              id: $id){
                  _id
              }
          }`;

export const DELETE_SUBJECT = gql`
mutation deleteSubject(
    $id: ID!){
        deleteSubject(
            id: $id){
                _id
            }
        }`;

export const UPDATE_STUDENT = gql`
          mutation updateStudent(
              $id: ID!,
              $name: String!,
              $email: String!,
              $phone: String!,
              $dob: String!) {
                  updateStudent(
                      id: $id,
                      name: $name,
                      email: $email,
                      phone: $phone,
                      dob: $dob) {
                          _id
                }
            }
        `;

export const UPDATE_SUBJECT = gql`
mutation updateSubject(
    $id: ID!,
    $name: String!) {
      updateSubject(
            id: $id,
            name: $name) {
                _id
      }
  }
`;
