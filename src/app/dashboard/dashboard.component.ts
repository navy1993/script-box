import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/shared.service';
import { Idea, User } from '../model/idea';
declare var localStorage: Storage;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ideaForm: FormGroup;

  ideaList: Idea[] = [new Idea()];
  user: User = new User();

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.user.employeeId = this.route.snapshot.params.empId;
    this.ideaForm = this.fb.group({
      title: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      tags: new FormControl('', Validators.required)
    });

    if(JSON.parse(localStorage.getItem('ideas:'))) {
      this.sharedService.ideaList$.next(JSON.parse(localStorage.getItem('ideas:')));
    }
    
    this.sharedService.ideaList$.subscribe((i: Idea[]) => {
      this.ideaList = i;
    })
  }

  onSubmit(form: FormGroup) {
    const idea: Idea = {
      title: form.value.title,
      desc: form.value.desc,
      tags: form.value.tags,
      upVote: 0,
      creationDate: new Date()
    };

    this.ideaList.push(idea);

    this.sharedService.ideaList$.next([...this.ideaList]);

    localStorage.setItem('ideas:', JSON.stringify(this.ideaList));
    form.reset();
  }

  upVote(idea: Idea) {
    if(!this.user.hasVoted) {
      this.user.hasVoted = true;
      idea.upVote += 1;
      this.sharedService.currentUser$.next(this.user);
      localStorage.setItem('ideas:', JSON.stringify(this.ideaList));
    }
  }
}
