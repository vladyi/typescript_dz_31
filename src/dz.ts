class School {
    // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods
  
    _areas: Area[] = [];
    _lecturers: Lecturer[] = []; // Name, surname, position, company, experience, courses, contacts
  
    get areas(): Area[] {
      return this._areas;
    }
  
    get lecturers(): Lecturer[] {
      return this._lecturers;
    }
  
    addLecturer(lecturer: Lecturer): void {
      if (!this._lecturers.some(l => l.name === lecturer.name && l.surname === lecturer.surname)) {
        this._lecturers.push(lecturer);
      }
    }
  
    removeLecturer(name: string, surname: string): void {
      this._lecturers = this._lecturers.filter(l => l.name !== name || l.surname !== surname);
    }
  
    addArea(area: Area): void {
      if (!this._areas.some(a => a.name === area.name)) {
        this._areas.push(area);
      }
    }
  
    removeArea(areaName: string): void {
      this._areas = this._areas.filter(a => a.name !== areaName);
    }
  }
  
  interface Lecturer {
    name: string;
    surname: string;
    position: string;
    company: string;
    experience: number;
    courses: string[];
    contacts: string[];
  }
  
  class Area {
    // implement getters for fields and 'add/remove level' methods
    _levels: Level[] = [];
    _name: string;
  
    constructor(name: string) {
      this._name = name;
    }
  
    get levels(): Level[] {
      return this._levels;
    }
  
    get name(): string {
      return this.name;
    }
  
    addLevel(level: Level): void {
      if (!this._levels.some(l => l.name === level.name)) {
        this._levels.push(level);
      }
    }
  
    removeLevel(levelName: string): void {
      this._levels = this._levels.filter(l => l.name !== levelName);
    }
  }
  
  class Level {
    // implement getters for fields and 'add/remove group' methods
  
    _groups: Group[] = [];
    _name: string;
    _description: string;
  
    constructor(name: string, description: string) {
      this._name = name;
      this._description = description;
    }
  
    get groups(): Group[] {
      return this._groups;
    }
  
    get name(): string {
      return this._name;
    }
  
    get description(): string {
      return this._description;
    }
  
    addGroup(group: Group): void {
      if (!this._groups.some(g => g.directionName === group.directionName && g.levelName === group.levelName)) {
        this._groups.push(group);
      }
    }
  
    removeGroup(directionName: string, levelName: string): void {
      this._groups = this._groups.filter(g => g.directionName !== directionName || g.levelName !== levelName);
    }
  
  }
  
  class Group {
    // implement getters for fields and 'add/remove student' and 'set status' methods
  
    _area: Area;
    _status: string;
    _students: Student[] = []; // Modify the array so that it has a valid toSorted method*
    _directionName: string;
    _levelName: string;
  
    constructor(directionName: string, levelName: string, status: string) {
      this._directionName = directionName;
      this._levelName = levelName;
      this._status = status;
      this._area = new Area(directionName);
    }
  
    showPerformance() {
      const sortedStudents = this._students.sort((a, b) => b.getPerformanceRating() - a.getPerformanceRating());
      return sortedStudents;
    }
  
    get directionName(): string {
      return this._directionName;
    }
  
    get levelName(): string {
      return this._levelName;
    }
  
    get students(): Student[] {
      return this._students;
    }
  
    get status(): string {
      return this._status;
    }
  
    set status(newStatus: string) {
      this._status = newStatus;
    }
  
    addStudent(student: Student): void {
      if (!this._students.some(s => s.fullName === student.fullName)) {
        this._students.push(student);
      }
    }
  
    removeStudent(fullName: string): void {
      this._students = this._students.filter(s => s.fullName !== fullName);
    }
  }
  
  class Student {
    // implement 'set grade' and 'set visit' methods
  
    _firstName: string;
    _lastName: string;
    _birthYear: number;
    _grades: { [workName: string]: number } = {}; // workName: mark
    _visits: { [lesson: string]: boolean } = {}; // lesson: present
  
    constructor(firstName: string, lastName: string, birthYear: number) {
      this._firstName = firstName;
      this._lastName = lastName;
      this._birthYear = birthYear;
    }
  
    get fullName(): string {
      return `${this._lastName} ${this._firstName}`;
    }
  
    set fullName(value) {
      [this._lastName, this._firstName] = value.split(' ');
    }
  
    get age(): number {
      return new Date().getFullYear() - this._birthYear;
    }
  
    setGrade(workName: string, mark: number): void {
      this._grades[workName] = mark;
    }
  
    setVisit(lesson: string, present: boolean): void {
      this._visits[lesson] = present;
    }
  
    getPerformanceRating(): number {
        const gradeValues: number[] = Object.values(this._grades);

        if (gradeValues.length === 0) return 0;
    
        // Ensure that all elements in gradeValues are numbers
        const averageGrade = gradeValues.reduce((sum, grade) => {
          return typeof grade === 'number' ? sum + grade : sum;
        }, 0) / gradeValues.length;
    
        const presentCount = Object.values(this._visits).filter(present => present).length;
        const attendancePercentage = (presentCount / Object.keys(this._visits).length) * 100;
    
        return (averageGrade + attendancePercentage) / 2;
    }
  }